import { useSearchParams } from "@remix-run/react";
import { useId, useRef, useState } from "react";
import { prose } from "~/components/css";
import { Button } from "~/components/landing-page/button";
import { QrPayment, iban } from "~/components/qr";

function mkSpayd({ ACC, ...data }: { [key: string]: string }) {
  console.log({ ACC, ...data });
  if (!ACC) return "";
  const acc = iban(ACC + "");
  const spayd =
    "SPD*1.0*ACC:" +
    acc +
    Object.entries(data)
      .map(([k, v]) => (v ? `*${k}:${v}` : ""))
      .join("");
  return spayd;
}

export default function QrPage() {
  const ref = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const [spayd, setSpayd] = useState(() => {
    return mkSpayd(Object.fromEntries(searchParams.entries()));
  });
  const onChange = () => {
    const form = ref.current;
    if (!form) return;
    const data = Object.fromEntries(new FormData(form).entries());

    setSpayd(mkSpayd(data as any));
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
      <Button type="submit">Vytvořit odkaz</Button>
      <pre>
        <code>SPAYD: {spayd.replace(/\*/g, "\n*")}</code>
      </pre>
      <div className="p-4">{spayd ? <QrPayment spayd={spayd} /> : null}</div>
    </form>
  );
}

function Input({
  label,
  defaultValue,
  ...props
}: {
  name: string;
  defaultValue: string;
  type?: "text" | "number";
  label: string;
  onChange: () => void;
}) {
  const id = useId();
  const [searchParams] = useSearchParams();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="form-input dark:bg-slate-700"
        defaultValue={
          searchParams.has(props.name)
            ? searchParams.get(props.name) ?? ""
            : defaultValue
        }
        {...props}
      />
    </div>
  );
}
