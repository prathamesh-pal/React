import "./App.css";
import { Button, Form, Input, Modal, QRCode } from "antd";
import { Download } from "lucide-react";
import { useRef, useState } from "react";

const DEFAULT_QR = {
  value: "https://harkirat.classx.co.in/",
  icon: "",
  bgColor: "#ffffff",
  color: "#000000",
};

function App() {
  const qrRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const [qr, setQr] = useState(DEFAULT_QR);

  const downloadNow = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
  };

  const chooseFile = ({ target }) => {
    const file = target.files?.[0];
    if (!file) return;

    setIcon(URL.createObjectURL(file));
  };

  const generateQR = (values) => {
    setQr({
      value: values.value,
      bgColor: values.bgColor || "#ffffff",
      color: values.color || "#000000",
      icon,
    });

    setOpen(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 bg-red py-12">
      <h1 className="text-3xl font-bold">QR Code Generator</h1>

      <div
        ref={qrRef}
        className="w-fit rounded-xl bg-white p-3 shadow-lg transition hover:scale-105 hover:shadow-2xl"
      >
        <QRCode
          value={qr.value}
          icon={qr.icon}
          bgColor={qr.bgColor}
          color={qr.color}
          size={220}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="primary"
          size="large"
          onClick={() => setOpen(true)}
        >
          Create QR
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<Download size={18} />}
          onClick={downloadNow}
        >
          Download
        </Button>
      </div>

      <Modal
        open={open}
        footer={null}
        destroyOnClose
        onCancel={() => setOpen(false)}
      >
        <h2 className="mb-6 text-xl font-semibold">
          Generate Your QR Code
        </h2>

        <Form
          layout="vertical"
          onFinish={generateQR}
          initialValues={{
            bgColor: "#ffffff",
            color: "#000000",
          }}
        >
          <Form.Item
            label="URL"
            name="value"
            rules={[
              {
                required: true,
                type: "url",
                message: "Enter a valid URL",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="https://example.com"
            />
          </Form.Item>

          <Form.Item
            label="Background Color"
            name="bgColor"
          >
            <Input
              type="color"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="QR Color"
            name="color"
          >
            <Input
              type="color"
              size="large"
            />
          </Form.Item>

          <Form.Item label="Logo">
            <Input
              type="file"
              accept="image/*"
              onChange={chooseFile}
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
          >
            Generate QR
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default App;