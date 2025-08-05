import React from 'react'
import Post from "./Post"
import { Key } from 'lucide-react'
import { useSelector } from 'react-redux'
import SkelitonPost from '../skeletonLoders/SkeletonPost'

function Posts() {
  const {posts, isPostsLoading} = useSelector(store => store?.post)
  if (isPostsLoading) {
    return(
      <div>
        {[...Array(5)].map((_,index)=>{
              return  <SkelitonPost key={index}/>
        })}
      </div>
    )
  }
  return (
    <div >
        {posts.map((post)=><Post key={post?._id}  post={post}/>)}
    </div>
    
  )
}

export default Posts