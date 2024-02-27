# onlyoffice-experiments backend
Before running the backend, make sure you set

export DOCUMENT_SERVER_PRIVATE_URL=http://localhost:80
export DOCUMENT_SERVER_PUBLIC_URL=http://localhost:80
export EXAMPLE_URL=http://host.docker.internal:8000

Use 
``` python manage.py runserver ```
to run


# onlyoffice-experiments frontend 
npm install --save @onlyoffice/document-editor-react
npm install
npm run start


## Run the docker container for document server,
  docker run -i -t -d -p 80:80 --restart=always -e JWT_ENABLED=false onlyoffice/documentserver
  
Locate default.json config in /etc/onlyoffice/documentserver inside the Docker container with Document Server first.
To connect to the container use command docker exec -it [ID] bash where [ID] is the ID of Document Server container. To enlist all running containers use docker ps.
Then in the default.json config locate this section:

			"request-filtering-agent" : {
				"allowPrivateIPAddress": false,
				"allowMetaIPAddress": false
			},
Change values false to true like that to allow these parameters:

			"request-filtering-agent" : {
				"allowPrivateIPAddress": true,
				"allowMetaIPAddress": true
			},
After the changes are done, use the command to rerun 
  supervisorctl restart all

For reference, https://forum.onlyoffice.com/t/how-to-allow-private-ip-to-access-onlyoffice-documentserver/5755

