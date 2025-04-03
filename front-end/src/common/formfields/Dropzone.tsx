import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { CloudUpload } from "@mui/icons-material";
import ButtonField from "./ButtonField";

type DropZoneProps = {
    labelCls?: string;
    maxFiles?: number;
    onChange?: (files: File[]) => void;
    boxCls?: string;
    label?: string;
    helperText?: string;
    Btnname?: string;
    dropZoneBtnCls?: string;
    mainContainerCls?: string;
    showXls?: boolean,
    singleDrop?: boolean,
    minHeight?: string,
    singleDropClassName?: string,
    accept?: any
};

const DropZone = (props: DropZoneProps) => {
    const { onChange, maxFiles } = props;
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (onChange) onChange(acceptedFiles);
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: maxFiles,
        multiple: true,
        accept: props.accept ? props.accept : {
            "image/*": [".jpeg", ".png"],
            "application/pdf": [".pdf"],
            "application/msword": [".doc", ".docx"],
            "application/vnd.ms-excel": [".xls", ".xlsx"]
        },
    });

    return (
        <div className={`flex flex-col gap-4 ${props.mainContainerCls}`}>
            <div className="flex justify-between">
                <label className={`text-sm font-medium ${props.labelCls}`}>
                    {props.label}
                </label>
                {props.helperText &&
                    <div className="flex gap-4">
                        <Image src={"help"} alt={`help`} />
                        <Typography component={`p`} className={`text-[#5E5E5E] text-sm font-medium`}>
                            {props.helperText}
                        </Typography>
                    </div>
                }
            </div>
            <Box
                display="flex"
                gap="2rem"
                minHeight={props.minHeight ?? "200px"}
                maxWidth="400px"
                alignItems="center"
                border="2px dashed"
                borderRadius="10px"
                borderColor="#25AFF2"
                flexDirection="column"
                justifyContent="center"
                bgcolor={isDragActive ? '#F5F5F5' : "#DDDDDDE5"}
                sx={{ transition: "all 250ms ease-in-out", outline: "none" }}
                {...getRootProps()}
                className={`shadow-inner ${props.boxCls}`}
            >
                {props.singleDrop ?
                    <Box className={props.singleDropClassName}>
                        <input {...getInputProps()} />
                        <CloudUpload className={`!text-[#25AFF2]`} />
                    </Box>
                    :
                    <>
                        <input {...getInputProps()} />
                        <p className={`text-[#333333] text-sm`}>{"Drag and Drop..."}</p>

                        <ButtonField
                            buttonextracls={`!bg-gradient-to-r from-[#2F88FF] to-[#1D68CD] hover:bg-[#1D68CD] !rounded-full !px-10 !capitalize w-[248px] h-[36px] shadow-md hover:shadow-lg ${props.dropZoneBtnCls}`}
                            extraTextCls='!text-[#F6F6F6] !font-bold !text-[16px]'
                            startIcon={<Image src={""} width={18} height={18} alt="uploadImg" />}
                            name={props.Btnname}
                            type={`button`}
                            variant={`contained`}
                        />
                    </>
                }
            </Box>
        </div>
    )
}

export default DropZone