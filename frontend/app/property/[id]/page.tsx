import { getProperty } from "@/lib/api";
import EnquiryForm from "@/components/EnquiryForm";
import ImageGallery from "@/components/ImageGallery";

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const property = await getProperty(id);

  const formattedStatus = property.status.replaceAll("_", " ");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E8C4B3]/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-[500px] h-[500px] w-[500px] rounded-full bg-[#C9A961]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[color:var(--muted)]">
          <span>Properties</span>
          <span>›</span>
          <span className="font-medium text-[#9B7E52]">
            {property.project_name}
          </span>
        </div>

        {/* Main Container */}
        <div className="glass-card overflow-hidden">

          {/* Gallery */}
          <div className="p-3 md:p-5">
            <ImageGallery images={property.images} />
          </div>

          {/* Property Information */}
          <div className="p-6 md:p-10">

            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

              {/* LEFT CONTENT */}
              <div>

                {/* Status */}
                <div className="flex flex-wrap items-center gap-3">

                  <span className="rounded-full border border-[#C9A961]/20 bg-[#C9A961]/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#9B7E52]">
                    {formattedStatus}
                  </span>

                  <span className="rounded-full bg-[#E8C4B3]/20 px-4 py-2 text-xs font-semibold text-[#9B7E52]">
                    {property.bhk}
                  </span>

                </div>

                {/* Title */}
                <h1 className="mt-5 text-4xl font-bold tracking-tight text-[color:var(--foreground)] md:text-5xl">
                  {property.project_name}
                </h1>

                {/* Location */}
                <div className="mt-4 flex items-center gap-2 text-[color:var(--muted)]">
                  <span className="text-lg text-[#C9A961]">

                  </span>

                  <span>
                    {property.location}
                  </span>
                </div>

                {/* Builder */}
                <div className="mt-2 flex items-center gap-2 text-sm text-[color:var(--muted)]">
                  <span>Developed by</span>

                  <span className="font-semibold text-[color:var(--foreground)]">
                    {property.builder_name}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-8 rounded-2xl border border-[#C9A961]/15 bg-gradient-to-br from-[#F5D5C8]/30 to-[#C9A961]/10 p-5">

                  <p className="text-sm font-medium text-[color:var(--muted)]">
                    Property Price
                  </p>

                  <p className="mt-1 text-3xl font-bold text-[#9B7E52] md:text-4xl">
                    ₹ {Number(property.price).toLocaleString("en-IN")}
                  </p>

                </div>

                {/* Details */}
                <div className="mt-8">

                  <h2 className="text-2xl font-bold text-[color:var(--foreground)]">
                    Property Details
                  </h2>

                  <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">

                    {/* BHK */}
                    <div className="detail-box">
                      <div className="detail-icon">

                      </div>

                      <p className="mt-3 text-xs text-[color:var(--muted)]">
                        Configuration
                      </p>

                      <p className="mt-1 font-bold text-[color:var(--foreground)]">
                        {property.bhk}
                      </p>
                    </div>

                    {/* Area */}
                    <div className="detail-box">
                      <div className="detail-icon">

                      </div>

                      <p className="mt-3 text-xs text-[color:var(--muted)]">
                        Carpet Area
                      </p>

                      <p className="mt-1 font-bold text-[color:var(--foreground)]">
                        {property.carpet_area} sq.ft
                      </p>
                    </div>

                    {/* Status */}
                    <div className="detail-box">
                      <div className="detail-icon">

                      </div>

                      <p className="mt-3 text-xs text-[color:var(--muted)]">
                        Status
                      </p>

                      <p className="mt-1 font-bold text-[#9B7E52]">
                        {formattedStatus}
                      </p>
                    </div>

                    {/* Builder */}
                    <div className="detail-box">
                      <div className="detail-icon">

                      </div>

                      <p className="mt-3 text-xs text-[color:var(--muted)]">
                        Builder
                      </p>

                      <p className="mt-1 line-clamp-1 font-bold text-[color:var(--foreground)]">
                        {property.builder_name}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Description */}
                <div className="mt-10">

                  <h2 className="text-2xl font-bold text-[color:var(--foreground)]">
                    About This Property
                  </h2>

                  <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]/70 p-5">
                    <p className="leading-8 text-[color:var(--muted)]">
                      {property.description}
                    </p>
                  </div>

                </div>

              </div>

              {/* RIGHT SIDEBAR */}
              <aside>

                <div className="sticky top-24 rounded-3xl border border-[#C9A961]/15 bg-[color:var(--card)]/80 p-6 shadow-xl backdrop-blur-xl">

                  <div className="mb-5">

                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7E52]">
                      Interested?
                    </span>

                    <h2 className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
                      Enquire About This Property
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      Get more information, schedule a visit, or speak
                      with our property consultant.
                    </p>

                  </div>

                  {/* Enquiry Form */}
                  <EnquiryForm propertyId={property.id} />

                </div>

              </aside>

            </div>

          </div>

        </div>

        {/* Bottom Trust Section */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="glass-card flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8C4B3]/30 text-xl">

            </div>

            <div>
              <p className="font-semibold text-[color:var(--foreground)]">
                Verified Listing
              </p>

              <p className="text-sm text-[color:var(--muted)]">
                Property information reviewed
              </p>
            </div>
          </div>

          <div className="glass-card flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C9A961]/15 text-xl">

            </div>

            <div>
              <p className="font-semibold text-[color:var(--foreground)]">
                Secure Enquiry
              </p>

              <p className="text-sm text-[color:var(--muted)]">
                Your information stays protected
              </p>
            </div>
          </div>

          <div className="glass-card flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4A574]/15 text-xl">

            </div>

            <div>
              <p className="font-semibold text-[color:var(--foreground)]">
                Expert Assistance
              </p>

              <p className="text-sm text-[color:var(--muted)]">
                Connect with a property consultant
              </p>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}