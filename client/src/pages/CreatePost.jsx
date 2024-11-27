import { Button, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Title - (Company name - Your name)' required id='title' className='flex-1' />
                    <Select>
                        <option value='uncategorized' hidden>Select a category</option>
                        <option value="placement">Placement</option>
                        <option value="internship">Internship</option>
                    </Select>
                    <Select>
                        <option value="uncategorized" hidden>Select a subcategory</option>
                        <option value="oncampus">On Campus</option>
                        <option value="offcampus">Off Campus</option>
                    </Select>
                </div>
                <ReactQuill theme='snow' placeholder='Write your experience here...' className='h-72 mb-12' required />
                <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
            </form>
        </div>
    )
}
