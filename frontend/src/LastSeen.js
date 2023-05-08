import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date }) {
  const createdAtTimestamp = new Date(date).getTime();
  return (
    <div>
       <ReactTimeAgo date={createdAtTimestamp} locale="en-US"/>
    </div>
  )
}