import SnippetEditForm from '@/components/snippet-edit-form'
import { db } from '@/db'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props{
  params: {
    id: string
  }
}

const EditSnippetsPage = async ({params}: Props) => {

  const id = parseInt(params?.id)
  
  const snippet = await db.snippet.findFirst({where: {id}})
  if(!snippet || !id) return notFound()

  return (
    <SnippetEditForm snippet={snippet}/>
  )
}

export default EditSnippetsPage