import { useId, useRef, useState } from "react";
import { prose } from "~/components/css";
import { QrPayment, iban } from "~/components/qr";

export default function QrPage() {
  const ref = useRef<HTMLFormElement>(null);
  const [spayd, setSpayd] = useState("");
  const onChange = () => {
    const form = ref.current;
    if (!form) return;
    const { ACC, ...data } = Object.fromEntries(new FormData(form).entries());

    const acc = iban(ACC + "");
    const spayd =
      "SPD*1.0*ACC:" +
      acc +
      Object.entries(data)
        .map(([k, v]) => (v ? `*${k}:${v}` : ""))
        .join("");

    setSpayd(spayd);
  };
  return (
    <form className={prose + " mx-auto grow"} ref={ref}>
      <Input onChange={onChange} label="Recipient" name="ACC" defaultValue="" />
      <Input
        onChange={onChange}
        label="Currency"
        name="CC"
        defaultValue="CZK"
      />
      <Input
        onChange={onChange}
        label="Amount"
        name="AM"
        type="number"
        defaultValue=""
      />
      <Input
        onChange={onChange}
        label="Sender's reference"
        name="RF"
        defaultValue=""
      />
      <Input
        onChange={onChange}
        label="Recipient's name"
        name="RN"
        defaultValue=""
      />
      <Input
        onChange={onChange}
        label="Due date (eg. 20121231)"
        name="DT"
        defaultValue=""
      />
      <Input
        onChange={onChange}
        label="Variabilní symbol"
        name="X-VS"
        defaultValue=""
      />
      <Input
        onChange={onChange}
        label="Specifický symbol"
        name="X-SS"
        defaultValue=""
      />
      <Input onChange={onChange} label="Message" name="MSG" defaultValue="" />
      <pre>
        <code>SPAYD: {spayd.replace(/\*/g, "\n*")}</code>
      </pre>
      <div className="p-4">{spayd ? <QrPayment spayd={spayd} /> : null}</div>
    </form>
  );
}

function Input({
  label,
  ...props
}: {
  name: string;
  defaultValue: string;
  type?: "text" | "number";
  label: string;
  onChange: () => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} className="form-input dark:bg-slate-700" {...props} />
    </div>
  );
}
