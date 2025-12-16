import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type KycDeclineFormData = {
  status: string;
  what_failed: string;
  admin_comment: string;
};

type KYCDeclineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: KycDeclineFormData) => void;
  title: string;
  isPending: boolean;
};

const allReasons = [
  "Incorrect BVN Detail",
  "Incorrect NIN Detail",
  "Invalid Proof of Address",
  "Invalid ID Card",
  "Blurry Document Upload",
  "Mismatch Between Name and ID",
];

const KYCDeclineModal = ({
  title,
  onSubmit,
  isPending,
  isOpen,
  onClose,
}: KYCDeclineModalProps) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [adminComment, setAdminComment] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const toggleReason = (reason: string) => {
    setError(""); // Clear error when selecting reasons
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleFormSubmit = () => {
    if (selectedReasons.length === 0) {
      setError("Please select at least one issue");
      return;
    }

    if (!adminComment.trim()) {
      setError("Please provide a detailed message");
      return;
    }

    const formData: KycDeclineFormData = {
      status: "declined",
      what_failed: selectedReasons.join(","),
      admin_comment: adminComment,
    };

    console.log("Submitting:", formData);
    onSubmit?.(formData);
    
    // Reset form after submission
    setSelectedReasons([]);
    setAdminComment("");
    setError("");
  };

  const handleClose = () => {
    setSelectedReasons([]);
    setAdminComment("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="mb-4 font-normal text-megagreen text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 space-y-6">
          {/* Select reasons */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Select Issues
            </Label>

            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal min-h-[48px] h-auto"
                >
                  {selectedReasons.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedReasons.map((reason) => (
                        <span
                          key={reason}
                          className="bg-megagreen/10 text-megagreen text-sm px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          {reason}
                          
                        </span>
                      ))}
                    </div>
                  ) : (
                    "Select one or more issues"
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-90">
                <DropdownMenuLabel>Decline Reasons</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allReasons.map((reason) => (
                  <DropdownMenuCheckboxItem
                    key={reason}
                    checked={selectedReasons.includes(reason)}
                    onCheckedChange={() => toggleReason(reason)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {reason}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Message */}
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Detail message
            </Label>
            <Textarea
              value={adminComment}
              onChange={(e) => {
                setAdminComment(e.target.value);
                setError(""); // Clear error when typing
              }}
              placeholder="Type a detailed note for the user..."
              className="focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 -mt-2">{error}</p>
          )}

          <Button
            type="button"
            onClick={handleFormSubmit}
            disabled={isPending}
            className="w-full bg-megagreen hover:bg-megagreen/90 text-white font-semibold py-2 px-4 rounded-md"
          >
            {isPending ? "Submitting..." : "Decline KYC and Send Email"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KYCDeclineModal;
