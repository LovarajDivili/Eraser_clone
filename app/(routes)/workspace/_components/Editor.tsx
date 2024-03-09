'use client'
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist'
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';


const rawDocument={
  "time" : 1550476186479,
  "blocks" : [{
      data:{
          text:'Document Name',
          level:2
      },
      id:"123",
      type:'header'
  },
  {
      data:{
          level:4
      },
      id:"1234",
      type:'header'
  }
],
  "version" : "2.8.1"
}

const Editor = ({onSaveTrigger,fileId,fileData}:any) => {

  const ref=useRef<EditorJS>();
  const [document,setDocument]=useState(rawDocument);
  const updateDocument=useMutation(api.files.updateDocument);

  React.useEffect(() => {
    fileData&&initEditor()
  },[fileData]) 

  React.useEffect(() => {
    console.log("onSaveTrigger", onSaveTrigger)
    onSaveTrigger&&onSaveDocument();
  },[onSaveTrigger])

  const initEditor=() => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      tools: {
        header: {
          class: Header,
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter a header',
            // levels: [2, 3, 4],
            // defaultLevel: 3
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            }
          }
        },
        paragraph: Paragraph,
        warning: Warning,
      },
      holder: 'editorjs',
      data:fileData.document?JSON.parse(fileData.document):rawDocument
    });

    ref.current=editor;
  }

  const onSaveDocument=()=>{
    if(ref.current) {
      ref.current.save().then((outputData) => {
        console.log('Article data: ', outputData)
        updateDocument({
          _id:fileId,
          document:JSON.stringify(outputData)
        }).then(resp=>{
          
            toast('Document Updated!')
          
        },(e)=>{
          toast("Server Error!")
        })
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
    }
  }

  return (
    <div>
      <div id="editorjs" className='ml-20'>

      </div>
    </div>
  )
}

export default Editor