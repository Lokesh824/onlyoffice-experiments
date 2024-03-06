import React, { useEffect, useState } from 'react'

function returnTileWordCount(wordCount, sentence){
    return sentence.split(' ').filter((_, idx) => idx < wordCount).join(' ');
}

const ReadMore = ({wordCount, cellData}) => {
    const [data, setData] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const showExpandBtn = cellData.split(' ').length > wordCount

    useEffect(() => {
        setData(isExpanded ? cellData : returnTileWordCount(wordCount, cellData));
    }, [isExpanded, cellData, wordCount, showExpandBtn])

  return (
    <>
        <p className='mb-1'>{data} {showExpandBtn && <span className='read-more' onClick={() => {setIsExpanded(!isExpanded)}}>{isExpanded ? "Show Less" : "Show More"}</span>}</p>
    </>
  )
}

export default ReadMore
