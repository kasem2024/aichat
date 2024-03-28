'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('aaee5a2c-ad79-4968-8d5d-0bdca363866c')
  }, [])

  return null
}

/* <script type="text/javascript">window.$crisp=[];
window.CRISP_WEBSITE_ID="aaee5a2c-ad
79-4968-8d5d-0bdca363866c";(function(

){d=document;s=d.createElement("script
");s.src="https://client.crisp.chat/l.j
s";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script> */
