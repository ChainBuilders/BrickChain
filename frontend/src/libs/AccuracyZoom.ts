export function accuracyToZoom(
  accuracyMeters: number,
  latitude: number
): number {
  // Calculate the earth’s circumference at this latitude
  const earthCircumference = 40075017 * Math.cos((latitude * Math.PI) / 180);
  // Total pixels across the world map at zoom level 21 (256px tile × 2^21 tiles)
  const worldPixels = 256 * 2 ** 21;
  // Meters per pixel at zoom 21
  const metersPerPixelAt21 = earthCircumference / worldPixels;

  // We want the accuracy circle to span roughly half the viewport width
  const targetPixels = window.innerWidth / 2;
  // Required meters-per-pixel to visualize that accuracy
  const requiredMpp = accuracyMeters / targetPixels;

  // Solve for zoom: metersPerPixelAtZ = metersPerPixelAt21 * 2^(21 - Z)
  // ⇒ 2^(21 - Z) = metersPerPixelAtZ / metersPerPixelAt21
  // ⇒ 21 - Z = log2(metersPerPixelAtZ / metersPerPixelAt21)
  // ⇒ Z = 21 - log2(metersPerPixelAtZ / metersPerPixelAt21)
  const zoom = 21 - Math.log2(requiredMpp / metersPerPixelAt21);

  // Clamp into valid Google Maps zoom range
  return Math.max(0, Math.min(21, Math.round(zoom)));
}
