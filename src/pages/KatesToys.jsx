import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid"

export default function KatesToys() {

    const auth = getAuth()

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({


        images: {},

    });
    const {
        images, } = formData;


    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true
        }

        if (e.target.value === "false") {
            boolean = false;
        }

        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }));
        }
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);


        if (images.length > 6) {
            setLoading(false)
            toast.error("6 images are allowed")
            return;
        }





        async function storeImage(image) {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, `katestoys/${filename}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        // eslint-disable-next-line default-case
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );



            })
        }
        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image)).catch((error) => {
                setLoading(false)
                toast.error("Images not uploaded")
                return
            })
        )
        console.log(imgUrls);
    };


    // if (loading) {
    //     return <Spinner />;
    // }



    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='text-3xl text-center mt-6 font-bold '>Create a Listing</h1>
            <form onSubmit={onSubmit}>



                <div className="mb-6">
                    <p className='text-lg font-semibold'>Images</p>
                    <p className='text-gray-600 '>The first Image is the cover. Max image is 6</p>
                    <input
                        type="file"
                        id="images"
                        onChange={onChange}
                        accept=".jpg,.png, .jpeg"
                        multiple
                        required
                        className='w-full px-3 py-1.5 text-gray-700 bg-white
                        border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'
                    />

                </div>
                <button
                    type="submit"
                    className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-200 ease-in-out"
                >Create Listing</button>
            </form>
        </main >
    )
}
