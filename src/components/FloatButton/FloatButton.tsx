import { Button } from "antd";
import { FC } from "react";
import styles from "./FloatButton.module.css";

interface FloatButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
}

export const FloatButton: FC<FloatButtonProps> = ({ icon, onClick, className = "" }) => {
    return (
        <Button
            type="primary"
            shape="circle"
            icon={icon}
            onClick={onClick}
            className={`${styles.floatButton} ${className}`}
        />
    );
};
