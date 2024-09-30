import { IconButton, Image } from "@chakra-ui/react";
import { BiCamera } from "react-icons/bi";
import { useEffect, useMemo, useRef } from "react";

import toast from "react-hot-toast";
import useCloudinaryLoaded from "../hooks/useCloudinaryLoaded";


interface CloudinaryResult { 
    event: string; 
    info: { public_id: string; secure_url: string; format: string };
}

interface Props {
    url: string;
    onUploadImage: (info: CloudinaryResult['info']) => void;
}

const ImageUpload: React.FC<Props> = ({ url, onUploadImage }) => {
  const isLoaded = useCloudinaryLoaded();
  const widgetRef = useRef<{ open: () => void; }>();

  const config = useMemo(() => {
    return {
        cloudName: import.meta.env.VITE_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
    }
  }, []);

  useEffect(() => {
    // @ts-expect-error There's a script which initializes cloudinary
    const cloudinary = window.cloudinary;

    if (isLoaded && cloudinary) {
        widgetRef.current = cloudinary.createUploadWidget(config, (error: Error, result: CloudinaryResult) => {
            if (error) return toast.error(error.message);
     
            if (result && result.event === "success") {
                onUploadImage(result.info);
            }
        });
    }

    // eslint-disable-next-line 
  }, [isLoaded, config]);

  return (
    <>
        <IconButton 
            color='gray'
            isLoading={!isLoaded || !widgetRef.current}
            size='lg'
            bg='gray.100'
            className="border border-gray-300"
            aria-label="Upload Trigger"
            icon={<BiCamera size={25} color='gray' />}
            onClick={() => widgetRef.current?.open()}
        />

        {url && <Image boxSize='5rem' objectFit='cover' rounded={5} mt={5} src={url} alt='Post Attachment' />}
    </>
  );
}

export default ImageUpload;