import { PhotoSlot } from "@/components/editorial/photo-slot";

export function PhotoBand() {
  return (
    <section aria-label="Parents and the institution" className="pb-20 sm:pb-28">
      <div className="container-page">
        <PhotoSlot
          name="parents-and-school"
          alt="A parent checking their child's attendance and results on a phone"
          caption="Parents follow attendance, fees and results from any phone. TODO: real photograph and caption."
          ratio="aspect-[4/3] sm:aspect-[21/9]"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
