import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, File, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  disabled?: boolean;
  className?: string;
  uploadedFile?: File | null;
  isUploading?: boolean;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  acceptedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
  maxSizeMB = 5,
  disabled = false,
  className,
  uploadedFile,
  isUploading = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "סוג קובץ לא נתמך",
        description: "אנא העלה תמונה (JPG, PNG) או קובץ PDF",
      });
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "קובץ גדול מדי",
        description: `גודל הקובץ לא יכול להיות יותר מ-${maxSizeMB}MB`,
      });
      return false;
    }

    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled || e.dataTransfer.files.length === 0) return;

      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    },
    [disabled, onFileSelect, validateFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || !e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
      e.target.value = "";
    },
    [disabled, onFileSelect, validateFile]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return "🖼️";
    }
    if (fileType === "application/pdf") {
      return "📄";
    }
    return "📎";
  };

  return (
    <div className={cn("w-full", className)}>
      {!uploadedFile ? (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isUploading ? "מעלה קובץ..." : "העלה מסמך מזהה"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              גרור ושחרר קובץ כאן או לחץ לבחירה
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              JPG, PNG או PDF עד {maxSizeMB}MB
            </p>
            <input
              type="file"
              accept={acceptedTypes.join(",")}
              onChange={handleFileSelect}
              disabled={disabled || isUploading}
              className="hidden"
              id="file-upload"
            />
            <Button 
              variant="outline" 
              asChild 
              disabled={disabled || isUploading}
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                {isUploading ? "מעלה..." : "בחר קובץ"}
              </label>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="text-2xl">
                  {getFileIcon(uploadedFile.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onFileRemove}
                disabled={disabled}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}