import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<Props> = ({ placeholder, onChangeText }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleResetForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (ref.current) {
        onChangeText(ref.current.value);
    }
  }, []);

  return (
    <form onSubmit={handleResetForm}>
      <InputGroup variant='outline' borderColor='gray.200' >
        <InputLeftElement children={<BsSearch color='gray' />} />
        <Input 
            ref={ref} 
            fontSize='small'
            color='black'
            borderRadius={20} 
            placeholder={placeholder}
            rounded={2} 
            bg='white' 
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;