import React, { useLayoutEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { getPostId } from '../../WebAPI'
import { LoadingContext } from '../../contexts'
import {
  PostContainer,
  PostTitle,
  PostBody,
  PostInfo,
  PostAuthor,
  PostCreatedAt,
  PostContent,
} from './PostPageStyle'

function PostPage() {
  const { id } = useParams()
  const { setIsLoading } = useContext(LoadingContext)
  const [post, setPost] = useState({})

  useLayoutEffect(() => {
    const getPost = async () => {
      setIsLoading(true)

      const data = await getPostId(id)
      setPost(data)

      setIsLoading(false)
    }

    getPost()
  }, [setIsLoading, id])

  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostBody>
        <PostInfo>
          <PostAuthor>{post.user && post.user.nickname}</PostAuthor>
          <PostCreatedAt>
            {new Date(post.createdAt).toLocaleDateString()}
          </PostCreatedAt>
        </PostInfo>
        <PostContent>
          <MDEditor.Markdown source={post.body} />
        </PostContent>
      </PostBody>
    </PostContainer>
  )
}

export default PostPage
