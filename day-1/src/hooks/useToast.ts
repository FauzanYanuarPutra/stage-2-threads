import { useToast as Toast } from "@chakra-ui/react";

type ToastStatus = "success" | "warning" | "info" | "error" | undefined;


export default function useToast() {

  const chakraToast = Toast();

  const toast = (title: string, description: string, status: ToastStatus) => {
    chakraToast({
      title,
      description,
      status,
    })
  }
  return toast;
}


