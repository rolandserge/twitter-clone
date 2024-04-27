import { IconType } from "react-icons";

export interface SideBarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    auth?: boolean;
    alert?: boolean;
    onClick?: () => void
}

export interface ButtonProps {
    label: string
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean
    disabled?: boolean
    outline?: boolean
    onClick: () => void
}

export interface ModalProps {
    isOpen?: boolean;
    title?: string;
    disabled?: boolean;
    actionLabel: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    onClose: () => void;
    onSubmit: () => void;
}

export interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

export interface ImageUploadProps {
    label: string;
    value: string;
    disabled?: boolean;
    onChange: (base64: string) => void;
}

export interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

export interface PostItemProps {
    data: Record<string, any>
    userId?: string
}