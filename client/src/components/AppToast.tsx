import {
  useToast,
  Button,
  Flex,
  Text,
  CloseButton,
  Alert,
  AlertIcon,
  type UseToastOptions,
} from "@chakra-ui/react";
import { useCallback } from "react";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

const useAppToast = () => {
  const toast = useToast();

  const showSuccessToast = useCallback(
    (message: string) => {
      toast({
        title: message,
        status: "success",
        variant: "top-accent",
        position: "bottom",
        duration: 5000,
        isClosable: false,
      });
    },
    [toast]
  );

  const showErrorToast = useCallback(
    (message: string) => {
      toast({
        title: message,
        status: "error",
        variant: "top-accent",
        position: "bottom",
        duration: 5000,
        isClosable: false,
      });
    },
    [toast]
  );

  const showUndoToast = useCallback(
    (
      message: string,
      action: ToastAction,

      status: UseToastOptions["status"] = "error" 
    ) => {
      toast({
        duration: 7000,
        position: "bottom",
        render: ({ onClose }) => (
          <Alert
            status={status}
            variant="top-accent"
            borderRadius="md"
            boxShadow="lg"
            alignItems="center"
            p={2}
          >
            <AlertIcon />
            <Flex flex="1" justify="space-between" align="center">
              <Text fontSize="md" mr={4}>{message}</Text>
              <Flex align="center">
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    action.onClick();
                    onClose();
                  }}
                >
                  {action.label}
                </Button>
                <CloseButton size="sm" onClick={onClose} ml={2}/>
              </Flex>
            </Flex>
          </Alert>
        ),
      });
    },
    [toast]
  );

  return { showSuccessToast, showErrorToast, showUndoToast };
};

export default useAppToast;