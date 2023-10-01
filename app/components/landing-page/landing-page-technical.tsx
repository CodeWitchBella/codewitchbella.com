import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "./button";

let timeoutHandle: ReturnType<typeof setTimeout> | null;

function CopyOnClick({ children }: { children: ReactNode }) {
  return (
    <div
      className="not-prose font-mono bg-gray-200 dark:bg-gray-800 rounded p-2 pr-6 max-h-28 overflow-y-auto overflow-x-hidden whitespace-pre-line"
      onClick={(event) => {
        const selection = window.getSelection();
        if (!selection) return;
        selection.selectAllChildren(event.currentTarget);
        document.execCommand("copy");
        document.querySelector(".copied")?.classList.remove("invisible");
        if (timeoutHandle) clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(function () {
          document.querySelector(".copied")?.classList.add("invisible");
          timeoutHandle = null;
        }, 2500);
      }}
    >
      {children}
    </div>
  );
}

export function Technical() {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible((v) => !v);
  return (
    <section className="my-8 prose max-w-prose mx-auto">
      <Button onClick={toggle}>Technical stuff</Button>
      <div style={visible ? {} : { display: "none" }} className="prose prose-pink dark:prose-invert pt-4">
        <h2>Primary SSH key</h2>
        <CopyOnClick>{`ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMr5ynyyHtVRtoXOCDmyJv4l6JwBWGgt2b4lo1dWLHoW isabella@isbl.cz`}</CopyOnClick>
        <h2>SSH key used for signing latest git commits</h2>
        <CopyOnClick>{`ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEGS4V/SauPK+C9moGX5gscGYYPNV5E6QNUyaZrL1eg0 signing@isbl.cz`}</CopyOnClick>
        
      </div>
      <div
        className="copied invisible"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "black",
            color: "white",
            fontSize: "3vw",
            padding: "3vw",
            borderRadius: "3vw",
          }}
        >
          Zkopírováno!
        </div>
      </div>
    </section>
  );
}

const gpg = `
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZF5GThYJKwYBBAHaRw8BAQdArwk8bmKYGjmZ/a8+7oK6+A3upr9uAsXJa9fL
p8Lxtuu0LklzYWJlbGxhIFNrb8WZZXBvdsOhIDxpc2FiZWxsYUBza29yZXBvdmEu
aW5mbz6ImQQTFgoAQRYhBKbYfd/iXRQ1BcLgS7xqnR+Dy857BQJkXkZOAhsDBQkD
wmcABQsJCAcCAiICBhUKCQgLAgQWAgMBAh4HAheAAAoJELxqnR+Dy857nd8BAO+6
5nj/C0yMz96g7HCgG/R4/xntxofZz5kOkoq6P+UnAP99aJjJl5oXgfFtLz7HGjOA
wBGV3k2l0pAM1LbNx2DGArg4BGReRk4SCisGAQQBl1UBBQEBB0AygORi0gvMTFpA
3mkO/97ljn8Wpjqa2VtST9hhWJjGLAMBCAeIfgQYFgoAJhYhBKbYfd/iXRQ1BcLg
S7xqnR+Dy857BQJkXkZOAhsMBQkDwmcAAAoJELxqnR+Dy8576VIBAP+PaDLQg0lr
Fzu35i8Lf9Y5778ZFhTt5oETCxgQ7RPUAP4hl13YqsIabMTv2cNHanyaBUuY/4es
riCWwZgVz0tvDg==
=cb6g
-----END PGP PUBLIC KEY BLOCK-----
`.trim();

const workGpg = `
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZF5CahYJKwYBBAHaRw8BAQdAyHECFxHUar8FkqpFa8+vZWz1ZHxQcPnVVsZm
skJOMY60LklzYWJlbGxhIFNrb8WZZXBvdsOhIDxpc2FiZWxsYUBza29yZXBvdmEu
aW5mbz6ImQQTFgoAQRYhBAaiBgMm0d5ropkEVTheSEmVAhwvBQJkXkJqAhsDBQkD
wmcABQsJCAcCAiICBhUKCQgLAgQWAgMBAh4HAheAAAoJEDheSEmVAhwvBWcBAM2U
T27CiNhAmzdqoc29NNJ62i1lP4mkmYD636tgByq4AP9kzBhRoAs2Yth5xtssJc8N
oa4mNw/mLKOqqCsiQ2WOALg4BGReQmoSCisGAQQBl1UBBQEBB0ABPu7sgDrgLCqG
LZXg21DYN1h5hnpyNublZzIHkxFRTgMBCAeIfgQYFgoAJhYhBAaiBgMm0d5ropkE
VTheSEmVAhwvBQJkXkJqAhsMBQkDwmcAAAoJEDheSEmVAhwvvlQBALNPXJcrZlhK
7Gv3SrG61DaWrsn+UKyhI8oKltMqEPLyAQD97UX0Z3cuO2kcAN2B9dIMbkJ7WyJ7
hDH+oViNGCh8DQ==
=NUN7
-----END PGP PUBLIC KEY BLOCK-----
`.trim();

/*
const ntbGpg = `
-----BEGIN PGP PUBLIC KEY BLOCK-----
mQINBFuztzEBEAC6bUeRqTDSEucmySBjc/Zuo9sIhNwhXzDNMjB+LlGH6KwcNthD
uImww096fLxm+6kWe1PU+D4JwmVpRlwmgOstnmGadxiCxqO9k2DRsrb72pxFJbCE
2ZaCnAkGUZWSk/GskY++K2w9wEe/TR0axtOThj0EGec71+6iQM6Vc4WUv6n0FwBl
ozJYEAOd30lsFzEW0M/Mt5NaTDUZHE6m8yyq625+s3A9Ymz7Inen6FbvteiYg2Wv
PYnzIKE10uTztRAEmBdi0f7AR6s583oKC578MkPrgvdpIlImWURiU5XHO57r6w+K
CRx+lL0kMSGH6wzXcKlTgbfCyT0MseEQmjqspruhdholRFGLtn9xJz4l0qO9wR1f
JTnKPw5XgjJ2GOwxKRBXLID432ttUFQQfOcPdnd4zU/1egBdb9jU3GWqzuIsGNfA
z9gYlayFnC7zQ2+67+g5D1n6n2thcU036btGgGyQEEYSw46FDvwJdDJMvYvZHvzD
oat9xi3q8CHs/9C9VijQyTPoK0GILUcE7kIB0YlPwRxmn8bKWS3IAUgqmSjF6ggm
6Wtov7PEgx2FGMRTBiKeoGaIEUU+29nz7HvuQ9CJzKeywSsSKOWY7G56Tqfpji+0
XLFRP8Ja/7KiOcF3hxwuXBTyJkDFe17ssYkIJvXIpO9uBKML/E0BZZqXdwARAQAB
tDRJc2FiZWxsYSBTa2/FmWVwb3bDoSAobnRiKSA8aXNhYmVsbGFAc2tvcmVwb3Zh
LmluZm8+iQJOBBMBCAA4FiEEazLP4x0uWdWMOdgzCUNK1j6BClsFAluztzECGwMF
CwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQCUNK1j6BCltwChAAgYEy2sfNy5ef
F+zZAXyPHl/jCDeOI64iAWJN+JZOmfiOTUvyOPlOF6Zt8T/0UV8x5cQkXEVmyWgR
kgFkg9bmjupO4Gidw0L7yEPS4swUtyu6/9I2COf/8CTlAcM8Sbu9XQ31P00XtACx
9/OgTVYBof8Om6z6krNIoHZKWJ5mlvv5MiAMrpU9TFFKuKsPprpnvsljFYU7TSaU
hbeJAckcLTCPr+ArzggVNXn0bO98TM/7B6Og6x/AFZ280BVuQ7O20AK9HkZb9/78
vCNTZXF9PYJaVGClJRApx++CxLL6fP4og3teDj/+79sPvinUtPcCC1JP5ZN6ANyt
/dsXN01p2BMkp1zJmu0Bq06ywFirBqfXr2l35kUyyT3RnxnLDIsiF+RS0gzY9Mk4
FRWKChLO9nMlmmUOu/CmUMm4bV+N9SLBZSSRlqixDfhYg3H+psQtg9eCwIxv7eQ6
ro3sYingLOUGH+T3yv5ohVBcb73ZgvdHroOBO6Gh8kUrTHgT6QSNzNCDBMt/yE9J
DIq53kIPd0hpcN6Nr25on1dkrXGImewci98bMgayai5MbzP23R/BY4DxIfLKOYIc
3Wex21xCQYKsJN9T7kf1eLn8wUCs6yBjGIONlExXCqv2L6o8Dg21BRAtupvrC4ph
zV8wY9IflKWKnwnnFjkQYb+YCDFsFpi5Ag0EW7O3MQEQALM6dbpBGkkfCT1PeU7x
7panzopdEssqkBxV5NMiEBZNDKLnIDn5Q5ibl6b/y+iP63aNd9F2D2U/tsXwgwvc
zg8nXUxOEBXyAo/YnjxTxRSU6hHawedq8Z4t9zfmzcv6A4SIdeQlAsu1HypVe7yG
zcnsuF33sO6vwbGZ6Wuim5tAqadlqiQrmg1rje3HDnPLracveAwoJKpL2nfqAlnZ
quBnLfKQIYGSo1qYwxilu9rr/LutAFHMOjNlFMdxOY7KsnDNlRmkvBiEpHPlNJdS
kKYkjahmsqXiTFFIoTifQ89mZaScMjRsN7CxvWKxT1kpp8qB5MbS6mjPA5wOBaY+
KvDGHBAxJU9Qw4TGhcrnfS+D8EALalEPMq5FqQMMxOOJ5qv/KubdbYHRdIZ5LXmm
gMgheuqUTzD3hhTTnvvpE1xGy+6PEbpKcMqn4rSB+C/myW0PFl/Ed40/ajedtVBB
uTOxxgnaYRkgfQRM74wVUMx1N8qMNWrNK3exCX4RsYGlXpmhlptxqeW4/Ll4sp9G
pXciqOKdL7Ywzn/46r0g1/Vr2N5EHglUqsgW8ABkR9vAdwW4HomRtJjaSZhaLd+4
22usyrGQp1nkPmC3wHfYk6p4xP2OLfzWMqPpywXjqhzh7x+F3vE2UzkRf7nm/O70
PEYWlL72NG8sClH80sEUMMHZABEBAAGJAjYEGAEIACAWIQRrMs/jHS5Z1Yw52DMJ
Q0rWPoEKWwUCW7O3MQIbDAAKCRAJQ0rWPoEKW3ZEEACj3awujNnx0V/vmRHSCrJV
1wkm4psAsM/WA4L3XTeifN4U2ZVmCGclCv7waRpzDjZFeQ40L3mDzirRwsAVZCzu
tcz4j4yJtlJzL0NHrIAEzXAF2BMmnwn+B3KkKODfnBTsl1PijUJL+wxScxrmSNVC
hthGzUA80zXFdehXe9ZZ7W6Bso1atuxQLBXSjaAcepvKy4mssiawHM41l2MCUB8i
6MbSO2jV5PHFW40svLSIkE+Xh+Viqlv49jeuK4oNdU1ka3gCnbfkar93sTLNznm1
xgVxTfw/EUgN3UMXtVE/y5bCsAO7SZDjTmL55gYweSxHijJI6GWBTQQJphSUpnw6
lpXzoQDRjUAo2vYG0hzWcSgu5zLGZFq/88jHWFc+MHNR0zYeNwOO3Hzx8bK5OiFJ
VZCGi1HhDF1fz+nQULkF2P7VZvi9hzlNANoWEjhIVXA8qRHu5PA82wSDZhjwGlPZ
XYfeIDontgNJh0/pKVSJrvGbqTchXOnWAfoz2cQ5rrgE2720ar1m8Lpj8zAD8GGC
oc0ufMVebayJ4LiNjPO82EJl+6JKxuQcGacqBrizu/FjifhjTYg6dbDUxo5yFMss
CNPspf3KSIc0AcepE7/Cyd9jbKmPNr1U1JH8pWLH8ieSl8rQCT/R7cA1PlUScjc+
xe6jvnOCdfyAsVWF8DuaIQ==
=Ws/U
-----END PGP PUBLIC KEY BLOCK-----
`.trim()
*/
