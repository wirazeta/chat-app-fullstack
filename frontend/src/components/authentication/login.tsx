import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/chat.provider";

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = ChatState();

    const submitHandler = async () => {
        setLoading(true);
        if(!email || !password){
            toast({
                title: "Please fill all the field",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        };
        setLoading(false);
        return;
    }
    try{
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/auth/login",
            { email, password },
            config
        );

        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    }catch(error: any){
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
    }
    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <Input
                    value={email}
                    type="email"
                    placeholder="Please enter your email"
                    onChange = {(e) => setEmail(e.target.value.toString())}
                />
            </FormControl>
        </VStack>
    )
}