import toast from "react-hot-toast";

import { Box, Flex, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { BiCamera, BiFile, BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { useEffect, useMemo, useRef, useState } from "react";

import { DocumentType } from "../services/documents";
import { getFileExtensionFromName } from "../utils/lib";
import { IMAGE_TYPES } from "../utils/constants";

import useCloudinaryLoaded from "../hooks/useCloudinaryLoaded";


interface CloudinaryResult { 
    event: string; 
    info: { public_id: string; secure_url: string; format: DocumentType; original_filename: string; };
}

interface Props {
    onUploadImage: (info: CloudinaryResult['info']) => void;
}

const ImageUpload: React.FC<Props> = ({ onUploadImage }) => {
  const [details, setDetails] = useState<CloudinaryResult['info'] | null>(null);

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
                setDetails(result.info);
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

        {details && (
          <HStack mt={5} alignItems="center">
              <Flex width="4rem" fontSize="2rem" justifyContent="center" alignItems="center" height="4rem" bg="gray.100" color="gray.800" borderWidth={1} borderColor="gray.200" rounded={5}>
                {IMAGE_TYPES.includes(details.format) && (
                  <Image
                    boxSize='5rem'
                    objectFit='cover'
                    rounded={5}
                    src={details.secure_url} 
                    alt='Post Attachment' 
                  />
                )}

                {details.format === DocumentType.PDF && (<BiSolidFilePdf />)}
                {details.format === DocumentType.TXT && (<BiSolidFileTxt />)}
                {details.format ? null : <BiFile />}
              </Flex>
              <Box>
                  <Text fontSize="1rem" color="gray.900" fontWeight="700">{details.original_filename}</Text>
                  <Text fontSize="0.875rem" color="gray.200">{details.format || getFileExtensionFromName(details.public_id)}</Text>
              </Box>
          </HStack>
        )}
    </>
  );
}

export default ImageUpload;