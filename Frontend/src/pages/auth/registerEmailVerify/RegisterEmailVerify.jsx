import Card from '../../../components/Card'
import { VStack, Icon, Box, Text, Button, Center, Container, useToast, Spinner } from "@chakra-ui/react"
import { MdEmail } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query'
import { sendVerificationMail } from '../../../api/query/userQuery.js'
import { useEffect } from 'react';

const RegisterEmailVerify = () => {
    const toast = useToast()
    const { email } = useParams();

    if (email === "") {
        return <Center h="100vh">Invalid Email try again</Center>
    }

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationKey: ['send-verification-email'],
        mutationFn: sendVerificationMail,
        onSettled: (data) => {
            console.log(data)
        },
        onError: (error) => {
            toast({
                title: "Sign Up Error",
                description: error.message,
                status: "error",
            });
        },
        enabled: !!email,
    });

    useEffect(() => {
        mutate({ email })
    }, [email])




    return (
        <Container>
            <Center minH="100vh">
                <Card
                    p={{
                        base: "4",
                        md: "10",
                    }}
                >
                    <VStack spacing={6}>
                        <Icon as={MdEmail} boxSize="48px" color="p.purple" />


                        <Text textStyle="h4" fontWeight="medium" color="p.black">
                            Email Verification
                        </Text>

                        <Text textAlign="center" textStyle="p2" color="black.60">
                            We have sent you an email verification to{" "}
                            <Box as="b" color="p.black">
                                {email}
                            </Box>
                            . If you didn’t receive it, click the button below.
                        </Text>

                        <Button w="full" variant="outline"
                            onClick={() => {
                                mutate({ email })
                            }}
                            isLoading={isLoading}
                        >
                            Re-Send Email
                        </Button>
                    </VStack>
                </Card>

            </Center>
        </Container>

    )
}

export default RegisterEmailVerify
