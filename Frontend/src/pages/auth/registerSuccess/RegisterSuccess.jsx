import Card from '../../../components/Card'
import { VStack, Icon, Box, Text, Button, Center, Container,Spinner,useToast } from "@chakra-ui/react"
import { PiSealCheckFill } from "react-icons/pi";
import { useMutation ,useQuery} from 'react-query';
import { Link, useParams } from 'react-router-dom';
import {verfiyEmailAddressSignup} from '../../../api/query/userQuery.js'
import { useNavigate } from 'react-router-dom';

const RegisterSuccess = () => {

    const toast = useToast();
    const { token } = useParams();
    const navigate = useNavigate();
    const { isSuccess, isLoading } = useQuery({
        queryKey: ["verify-email-token"],
        queryFn: () => verfiyEmailAddressSignup({ token }),
        enabled: !!token,
        onError: (error) => {
            toast({
                title: "SignUp Error",
                description: error.message,
                status: "error",
            });

            navigate("/signup");
        },
    });

    if (isLoading)
        return (
            <Center h="100vh">
                <Spinner />
            </Center>
        );

    return (
        <Container>
            <Center minH="100vh">
                {
                    isSuccess && <Card
                        p={{
                            base: "4",
                            md: "10",
                        }}
                    >
                        <VStack spacing={6}>
                            <Icon as={PiSealCheckFill} boxSize="48px" color="green" />

                            <Text textStyle="h4" fontWeight="medium" color="p.black">
                                Successfull Registration
                            </Text>

                            <Text textAlign="center" textStyle="p2" color="black.60">
                                Hurray! Your account has been created successfully
                            </Text>

                            <Box w="full">
                                <Link to="/signin">
                                    <Button w="full" >  Enter Your account </Button>
                                </Link>
                            </Box>
                        </VStack>
                    </Card>
                }
            </Center>
        </Container>

    )
}

export default RegisterSuccess
