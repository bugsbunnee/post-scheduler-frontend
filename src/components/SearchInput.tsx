import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { BsSearch } from "react-icons/bs";

import usePostQueryStore from "../store/posts";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = usePostQueryStore(s => s.setSearchText);

  const handleResetForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (ref.current) {
        setSearchText(ref.current.value);
    }
  }, [setSearchText]);

  return (
    <form onSubmit={handleResetForm}>
      <InputGroup variant='outline' borderColor='gray.200' >
        <InputLeftElement children={<BsSearch color='gray' />} />
        <Input 
            ref={ref} 
            fontSize='small'
            color='black'
            borderRadius={20} 
            placeholder='Search posts...' 
            rounded={2} 
            bg='white' 
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;