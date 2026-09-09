// Inline SVG icons (24x24, stroke-based line icons) + brand logos.
// Matches the line-icon style used across the Tattle Figma file.

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

export function IconInbox({ filled, ...props }) {
  if (filled) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path
          fillRule="evenodd"
          d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
        />
      </svg>
    );
  }
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="m4 6 8 6 8-6" />
    </svg>
  );
}

export function IconTodo({ filled, ...props }) {
  if (filled) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="6.2" cy="8" r="3.05" fill="currentColor" />
        <path
          d="M4.85 8.05 5.95 9.2 7.7 6.9"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="11.1" y="7" width="9.2" height="2.05" rx="1.02" fill="currentColor" />
        <circle cx="6.2" cy="16.1" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <rect x="11.1" y="15.1" width="9.2" height="2.05" rx="1.02" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...base} {...props}>
      <path d="M9 6h11" />
      <path d="M9 12h11" />
      <path d="M9 18h11" />
      <path d="m3.5 5.5 1 1 1.5-2" />
      <path d="m3.5 11.5 1 1 1.5-2" />
      <rect x="3.2" y="16.4" width="3.2" height="3.2" rx="0.7" />
    </svg>
  );
}

export function IconStats({ filled, ...props }) {
  if (filled) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <rect x="3.6" y="13.2" width="4.4" height="7.3" rx="2.2" />
        <rect x="9.8" y="8.4" width="4.4" height="12.1" rx="2.2" />
        <rect x="16" y="4.5" width="4.4" height="16" rx="2.2" />
      </svg>
    );
  }
  return (
    <svg {...base} {...props}>
      <path d="M5 20V11" />
      <path d="M12 20V4" />
      <path d="M19 20v-6" />
    </svg>
  );
}

export function IconBell(props) {
  return (
    <svg {...base} {...props}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

export function IconProfile({ filled, ...props }) {
  if (filled) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path
          fillRule="evenodd"
          d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.5.5 0 0 0 13.92 2h-3.84a.5.5 0 0 0-.48.41L9.24 4.95c-.59.24-1.12.56-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.47a.49.49 0 0 0 .12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.3.6.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.12-.56 1.62-.94l2.39.96c.23.08.48 0 .6-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 0 12 8.4a3.6 3.6 0 0 0 0 7.2Z"
        />
      </svg>
    );
  }
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
    </svg>
  );
}

export function IconStar({ filled, ...props }) {
  return (
    <svg
      {...base}
      fill={filled ? "currentColor" : "none"}
      {...props}
    >
      <path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.2l5.9-.9L12 3Z" />
    </svg>
  );
}

export function IconSend(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

export function IconRefresh(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 11a8 8 0 1 0-.9 4.5" />
      <path d="M20 5v5h-5" />
    </svg>
  );
}

export function IconFlag(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function IconSliders(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h10" />
      <path d="M18 7h2" />
      <circle cx="16" cy="7" r="2" />
      <path d="M4 17h2" />
      <path d="M10 17h10" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  );
}

export function IconBack(props) {
  return (
    <svg {...base} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function IconMore(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}

export function IconReply(props) {
  return (
    <svg {...base} {...props}>
      <path d="M10 8 4 13l6 5" />
      <path d="M4 13h9a7 7 0 0 1 7 7" />
    </svg>
  );
}

export function IconPlus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function IconChevronRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconChevronDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconThumbsUp(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M7 10v10H4V10h3Zm2 0 3.2-6.5c.9.2 1.5 1 1.5 2V8h4.3a1.8 1.8 0 0 1 1.8 2.2l-1.4 7A1.8 1.8 0 0 1 16.6 19H9V10Z" />
    </svg>
  );
}

export function IconArrowUp(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19V6" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

export function IconArrowDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v13" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function IconSparkle(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3Z" />
      <path d="M18.5 13l.8 2.2L21.5 16l-2.2.8L18.5 19l-.8-2.2L15.5 16l2.2-.8.8-2.2Z" />
    </svg>
  );
}

export function IconTemplate(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function IconExternal(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function IconInfo(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function IconTag(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 11.5 3H20v8.5L11.5 20 3 11.5Z" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCategories(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
      <circle cx="12" cy="6" r="2.6" />
      <circle cx="6.5" cy="16" r="2.6" />
      <circle cx="17.5" cy="16" r="2.6" />
    </svg>
  );
}

export function IconDayparts(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <rect x="6" y="13" width="6" height="3.5" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChannels(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="4" r="1.9" />
      <circle cx="12" cy="20" r="1.9" />
      <circle cx="4.5" cy="7.8" r="1.9" />
      <circle cx="19.5" cy="7.8" r="1.9" />
      <circle cx="4.5" cy="16.2" r="1.9" />
      <circle cx="19.5" cy="16.2" r="1.9" />
    </svg>
  );
}

export function IconItemFeedback(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M4 5.5h16v10H8l-4 3.5V5.5Z" strokeLinejoin="round" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

// ── Brand / channel logos (40x40 rounded avatars) ──

export function LogoGoogle(props) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...props}>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5H1.2v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.2 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.2 6.6l4 3.1c1-2.9 3.7-4.9 6.8-4.9Z" />
    </svg>
  );
}

export function LogoYelp(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...props}>
      <path
        fill="#d32323"
        d="m7.6885 15.1415-3.6715.8483c-.3769.0871-.755.183-1.1452.155-.2611-.0188-.5122-.0414-.7606-.213a1.179 1.179 0 0 1-.331-.3594c-.3486-.5519-.3656-1.3661-.3697-2.0004a6.2874 6.2874 0 0 1 .3314-2.0642 1.857 1.857 0 0 1 .1073-.2474 2.3426 2.3426 0 0 1 .1255-.2165 2.4572 2.4572 0 0 1 .1563-.1975 1.1736 1.1736 0 0 1 .399-.2831 1.082 1.082 0 0 1 .4592-.0837c.2355.0016.5139.052.91.1734.0555.0191.1237.0382.1856.0572.3277.1013.7048.2404 1.1499.3987.6863.2404 1.3663.487 2.0463.7397l1.2117.4423c.2217.0807.4363.18.6412.297.174.0984.3273.2298.4512.387a1.217 1.217 0 0 1 .192.4309 1.2205 1.2205 0 0 1-.872 1.4522c-.0468.0151-.0852.0239-.1085.0293l-1.105.2553-.0031-.001zM18.8208 7.565a1.8506 1.8506 0 0 0-.2042-.1754 2.4082 2.4082 0 0 0-.2077-.1394 2.3607 2.3607 0 0 0-.2269-.109 1.1705 1.1705 0 0 0-.482-.0796 1.0862 1.0862 0 0 0-.4498.1263c-.2107.1048-.4388.2732-.742.5551-.042.0417-.0947.0886-.142.133-.2502.2351-.5286.5252-.8599.863a114.6363 114.6363 0 0 0-1.5166 1.5629l-.8962.9293a4.1897 4.1897 0 0 0-.4466.5483 1.541 1.541 0 0 0-.2364.5459 1.2199 1.2199 0 0 0 .0107.4518l.0046.02a1.218 1.218 0 0 0 1.4184.923 1.162 1.162 0 0 0 .1105-.0213l4.7781-1.104c.3766-.087.7587-.1667 1.097-.3631.2269-.1316.4428-.262.5909-.5252a1.1793 1.1793 0 0 0 .1405-.4683c.0733-.6512-.2668-1.3908-.5403-1.963a6.2792 6.2792 0 0 0-1.2001-1.7103zM8.9703.0754a8.6724 8.6724 0 0 0-.83.1564c-.2754.066-.548.1383-.8146.2236-.868.2844-2.0884.8063-2.295 1.8065-.1165.5655.1595 1.1439.3737 1.66.2595.6254.614 1.1889.9373 1.7777.8543 1.5545 1.7245 3.0993 2.5922 4.6457.259.4617.5416 1.0464 1.043 1.2856a1.058 1.058 0 0 0 .1013.0383c.2248.0851.4699.1016.7041.0471a4.3015 4.3015 0 0 0 .0418-.0097 1.2136 1.2136 0 0 0 .5658-.3397 1.1033 1.1033 0 0 0 .079-.0822c.3463-.435.3454-1.0833.3764-1.6134.1042-1.771.2139-3.5423.3009-5.3142.0332-.6712.1055-1.3333.0655-2.0096-.0328-.5579-.0368-1.1984-.3891-1.6563-.6218-.8073-1.9476-.741-2.8523-.6158zm2.084 15.9505a1.1053 1.1053 0 0 0-1.2306-.4145 1.1398 1.1398 0 0 0-.1526.0633 1.4806 1.4806 0 0 0-.2171.1354c-.1992.1475-.3668.3392-.5196.5315-.0386.049-.074.1143-.12.1562l-.7686 1.0573a113.9168 113.9168 0 0 0-1.2913 1.789c-.278.3895-.5184.7184-.7083 1.0094-.036.0547-.0734.116-.1075.1647-.2277.3522-.3566.6092-.4228.8381a1.0945 1.0945 0 0 0-.046.4721c.0211.1655.0768.3246.1635.467.046.0715.0957.1406.1487.207a2.334 2.334 0 0 0 .1754.1825 1.843 1.843 0 0 0 .2108.1732c.5304.369 1.1112.6342 1.722.8391a6.0958 6.0958 0 0 0 1.5716.3004c.091.0046.1821.0025.2728-.006a2.3878 2.3878 0 0 0 .2506-.0351 2.3862 2.3862 0 0 0 .2447-.071 1.1927 1.1927 0 0 0 .4175-.2658c.1127-.113.1994-.249.2541-.3989.0889-.2214.1473-.5026.1857-.92.0034-.0593.0118-.1305.0177-.1958.0304-.3463.0443-.7531.0666-1.2315.0375-.7357.067-1.4681.0903-2.2026 0 0 .0495-1.3053.0494-1.306.0113-.3008.002-.6342-.0814-.9336a1.396 1.396 0 0 0-.1756-.4054zm8.6754 2.0439c-.1605-.176-.3878-.3514-.7462-.5682-.0518-.0288-.1124-.0674-.1684-.1009-.2985-.1795-.658-.3684-1.078-.5965a120.7615 120.7615 0 0 0-1.9427-1.042l-1.1515-.6107c-.0597-.0175-.1203-.0607-.1766-.0878-.2212-.1058-.4558-.2045-.6992-.2498a1.4915 1.4915 0 0 0-.2545-.0265 1.1527 1.1527 0 0 0-.1648.01 1.1077 1.1077 0 0 0-.9227.9133 1.4186 1.4186 0 0 0 .0159.439c.0563.3065.1932.6096.3346.875l.615 1.1526c.3422.65.6884 1.2963 1.0435 1.9406.229.4202.4196.7799.5982 1.078.0338.056.0721.1163.1011.1682.2173.3584.392.584.569.7458.1146.1107.252.195.4026.247.1583.0525.326.071.4919.0546a2.368 2.368 0 0 0 .251-.0435c.0817-.022.1622-.048.241-.0784a1.863 1.863 0 0 0 .2475-.1143 6.1018 6.1018 0 0 0 1.2818-.9597c.4596-.4522.8659-.9454 1.182-1.51.044-.08.0819-.163.1138-.2483a2.49 2.49 0 0 0 .0773-.2411c.0186-.083.033-.1669.0429-.2513a1.188 1.188 0 0 0-.0565-.491 1.0933 1.0933 0 0 0-.248-.4041z"
      />
    </svg>
  );
}

export function LogoFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} {...props}>
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z" />
    </svg>
  );
}

export function LogoUberEats(props) {
  return (
    <span className="logo-ubereats" {...props}>
      Uber<span>Eats</span>
    </span>
  );
}

export function LogoDoorDash(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...props}>
      <path fill="#FF3008" d="M23.071 8.409a6.09 6.09 0 0 0-5.396-3.228H.584A.589.589 0 0 0 .17 6.184L3.894 9.93a1.752 1.752 0 0 0 1.242.516h12.049a1.554 1.554 0 1 1 .031 3.108H8.91a.589.589 0 0 0-.415 1.003l3.725 3.747a1.75 1.75 0 0 0 1.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413" />
    </svg>
  );
}

export function LogoTripadvisor(props) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...props}>
      <path fill="#34E0A1" d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z" />
    </svg>
  );
}

export function LogoOpenTable(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...props}>
      <circle cx="12" cy="12" r="10" fill="#DA3743" />
      <circle cx="12" cy="12" r="3.1" fill="#fff" />
    </svg>
  );
}

export function ChannelLogo({ channel }) {
  if (channel === "Google") return <span className="brand-avatar white"><LogoGoogle /></span>;
  if (channel === "Yelp") return <span className="brand-avatar white"><LogoYelp /></span>;
  if (channel === "Facebook") return <span className="brand-avatar white"><LogoFacebook /></span>;
  if (channel === "DoorDash") return <span className="brand-avatar white"><LogoDoorDash /></span>;
  if (channel === "Tripadvisor") return <span className="brand-avatar white"><LogoTripadvisor /></span>;
  if (channel === "OpenTable") return <span className="brand-avatar white"><LogoOpenTable /></span>;
  if (channel === "Uber Eats") return <span className="brand-avatar ue"><LogoUberEats /></span>;
  return (
    <span className="brand-avatar generic">
      <IconInbox width={20} height={20} />
    </span>
  );
}
