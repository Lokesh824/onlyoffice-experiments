from copy import deepcopy
import json
import os
from urllib.parse import urlparse
import requests
from src.configuration import ConfigurationManager
from src.proxy import ProxyManager
from . import jwtManager, docManager, historyManager, fileUtils, serviceConverter

config_manager = ConfigurationManager()

def parseCommands(commands):
    """
    Will parse the list of commands and generate docbuilder code
    """
    return """
        var oParagraph = oDocument.GetElement(0);
        oParagraph.AddText("Some random generated text");
        Api.AddComment(oParagraph, "comment", "John Smith");
        var aComments = oDocument.GetAllComments();
        var sText = aComments[0].GetText();
        oParagraph = Api.CreateParagraph();
        oParagraph.AddText("Comment text: " + sText);
        oDocument.Push(oParagraph);
        """
    docbuilderLines = []
    for command in commands:
        # do something, just going to add some random stuff for now
        docbuilderLines.append("something here")

def genDocbuilder(filename, fileExt, commands):
    """
    Builds a docbuilder file to send to the DocBuilder API
    """
    coreCommands = parseCommands(commands)
    
    docbuilder_content = f"""
    builder.CreateFile("{fileExt}");
    var oDocument = Api.GetDocument();
    {coreCommands}
    builder.SaveFile("{fileExt}","{filename}.{fileExt}");
    builder.CloseFile();
    """

    return docbuilder_content


# create a docbuilder request
def builderRequest(commands, req):
    headers={'accept': 'application/json'}

    filename = req.GET.get("fileName") or "new"
    fileExt = req.GET["fileExt"]

    # write some function to handle different commands but hardcode table for now
    payload = {}
    filename = docManager.getCorrectName(filename, req)
    print(filename)
    builderCode = genDocbuilder(filename, fileExt, commands)
    builder_file_path = docManager.getBuilderPath(filename, req)
    print(builder_file_path)
    with open(f"{builder_file_path}.docbuilder", "w+") as fh:
        fh.write(builderCode)

    payload["url"] = f"{config_manager.example_url().geturl()}/builder?fileName={filename}.docbuilder"
    payload["async"] = False

    print(payload["url"])

    if (jwtManager.isEnabled() and jwtManager.useForRequest()): # check if a secret key to generate token exists or not
        headerToken = jwtManager.encode({'payload': payload}) # encode a payload object into a header token
        headers[config_manager.jwt_header()] = f'Bearer {headerToken}' # add a header Authorization with a header token with Authorization prefix in it
        #payload doesn't need to contain token since it's in the header
        #payload['token'] = jwtManager.encode(payload) # encode a payload object into a body token

    response = requests.post(config_manager.document_builder_api_url().geturl(), json=payload, headers=headers, verify = config_manager.ssl_verify_peer_mode_enabled())
    response_body = response.json()
    
    if "urls" in response_body:
        for doc in response_body["urls"].keys():
            filename = docManager.getCorrectName(doc, req)
            filepath = docManager.getStoragePath(filename, req)
            # With save should probably be true
            docManager.downloadFileFromUri(response_body["urls"][doc], filepath, True)

    # TODO need to figure out what to return here. Maybe an editor?

    return response