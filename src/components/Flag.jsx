import { getFlagCode } from '../utils/flagMap';

export default function Flag({ code, size = 20 }) {
  const cc = getFlagCode(code);
  if (!cc) return <span style={{ width: size, height: size, display: 'block', flexShrink: 0 }} />;
  return (
    <img
      src={`https://flagcdn.com/w40/${cc}.png`}
      srcSet={`https://flagcdn.com/w80/${cc}.png 2x`}
      alt={code}
      width={size}
      height={size}
      style={{
        borderRadius: 'var(--radius-full)',
        objectFit: 'cover',
        display: 'block',
        flexShrink: 0,
      }}
    />
  );
}
