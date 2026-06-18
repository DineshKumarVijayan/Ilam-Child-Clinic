import { siteConfig } from "@/lib/site-config";
import { StarRating } from "@/components/StarRating";

export function GoogleReviews() {
  return (
    <section id="reviews" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-medical-teal">
            Patient Feedback
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by parents
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Families in Chennai choose ILAM Child Clinic for compassionate care,
            clear guidance, and a welcoming environment for children.
          </p>

          <div className="mt-8 inline-flex flex-col items-center rounded-3xl border border-slate-200 bg-slate-50/80 px-8 py-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-slate-900">
                {siteConfig.googleRating.toFixed(1)}
              </span>
              <div className="text-left">
                <StarRating rating={siteConfig.googleRating} size="lg" />
                <p className="mt-1 text-sm text-slate-500">
                  Based on {siteConfig.googleReviewCount} Google reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {siteConfig.reviews.map((review) => (
            <article
              key={review.name}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-medical-teal/20 hover:shadow-lg hover:shadow-medical-teal/10"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-900">{review.name}</p>
                <p className="text-xs text-slate-500">{review.date}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={siteConfig.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-medical-blue/20 bg-white px-8 py-3.5 text-sm font-semibold text-medical-blue transition hover:border-medical-blue/40 hover:bg-medical-blue/5"
          >
            Read more reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
