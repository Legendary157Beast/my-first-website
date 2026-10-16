
import { useEffect } from "react";
import { X, Truck } from "lucide-react";

export default function ShippingPolicyModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/60
        p-3 sm:p-5
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shipping-policy-title"
        className="
          relative
          flex
          w-full
          max-w-4xl
          max-h-[92vh]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          className="
            flex shrink-0
            items-center justify-between
            border-b border-slate-200
            px-4 py-4
            sm:px-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full
                bg-emerald-50
                text-emerald-700
              "
            >
              <Truck size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="shipping-policy-title"
                className="
                  truncate
                  text-lg font-semibold
                  text-slate-900
                  sm:text-xl
                "
              >
                Shipping Policy
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                शिपिंग नीति
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Shipping Policy / शिपिंग नीति बंद करें"
            className="
              ml-3
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              active:scale-95
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* POLICY CONTENT */}
        <div
          className="
            min-h-0 flex-1
            overflow-y-auto
            overscroll-contain
            px-4 py-5
            sm:px-7 sm:py-7
          "
        >
          <article
            className="
              mx-auto
              max-w-3xl
              text-sm
              leading-7
              text-slate-700
              sm:text-[15px]
            "
          >
            <h1
              className="
                mb-5
                text-2xl font-bold
                text-slate-900
                sm:text-3xl
              "
            >
              Shipping Policy
              <span className="mt-1 block text-lg font-semibold text-emerald-700 sm:text-xl">
                शिपिंग नीति
              </span>
            </h1>

            {/* SHIPPING POLICY & DURATION */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                Shipping Policy & Duration
              </h3>

              <p className="mb-4 text-slate-600">
                शिपिंग नीति एवं समयावधि
              </p>

              <div className="space-y-5">
                <div
                  className="
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    p-4 sm:p-5
                  "
                >
                  <p className="font-semibold text-slate-900">
                    Purchases Above 100 Volume Points
                  </p>

                  <p className="text-sm font-medium text-emerald-700">
                    100 वॉल्यूम पॉइंट से अधिक की खरीदारी
                  </p>

                  <p className="mt-2">
                    Courier charges are 2.5% + GST on the amount.
                  </p>

                  <p className="mt-1">
                    कूरियर शुल्क राशि का 2.5% तथा लागू GST होगा।
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    p-4 sm:p-5
                  "
                >
                  <p className="font-semibold text-slate-900">
                    Purchases Below 100 Volume Points
                  </p>

                  <p className="text-sm font-medium text-emerald-700">
                    100 वॉल्यूम पॉइंट से कम की खरीदारी
                  </p>

                  <p className="mt-2">
                    Courier charges are a minimum of ₹99.
                  </p>

                  <p className="mt-1">
                    न्यूनतम कूरियर शुल्क ₹99 होगा।
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    p-4 sm:p-5
                  "
                >
                  <p className="font-semibold text-slate-900">
                    Dispatch Schedule
                  </p>

                  <p className="text-sm font-medium text-emerald-700">
                    ऑर्डर भेजने का समय
                  </p>

                  <p className="mt-2">
                    Orders will be dispatched from the warehouse Monday
                    through Saturday.
                  </p>

                  <p className="mt-1">
                    ऑर्डर सोमवार से शनिवार तक गोदाम से भेजे जाएँगे।
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    p-4 sm:p-5
                  "
                >
                  <p className="font-semibold text-slate-900">
                    Estimated Delivery
                  </p>

                  <p className="text-sm font-medium text-emerald-700">
                    अनुमानित डिलीवरी समय
                  </p>

                  <p className="mt-2">
                    Estimated delivery time is 5 to 7 working days from
                    the date of order confirmation.
                  </p>

                  <p className="mt-1">
                    ऑर्डर की पुष्टि की तारीख से अनुमानित डिलीवरी समय
                    5 से 7 कार्यदिवस होगा।
                  </p>
                </div>
              </div>
            </section>

            {/* LOCAL RESTRICTIONS */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                Local Restrictions
              </h3>

              <p className="mb-4 text-slate-600">
                स्थानीय प्रतिबंध
              </p>

              <div
                className="
                  rounded-xl
                  border border-amber-200
                  bg-amber-50
                  p-4 sm:p-5
                "
              >
                <p>
                  If your delivery address is in an area affected by local
                  restrictions, your shipment may be delayed and courier
                  charges may increase.
                </p>

                <p className="mt-2">
                  यदि आपका डिलीवरी पता स्थानीय प्रतिबंधों से प्रभावित
                  क्षेत्र में है, तो शिपमेंट में देरी हो सकती है और
                  कूरियर शुल्क बढ़ सकता है।
                </p>

                <p className="mt-3 font-medium">
                  Thank you for your patience.
                </p>

                <p className="font-medium">
                  आपके धैर्य और सहयोग के लिए धन्यवाद।
                </p>
              </div>
            </section>

            {/* RETURN SHIPPING */}
            <section className="mb-4">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                Return Shipping
              </h3>

              <p className="mb-4 text-slate-600">
                उत्पाद वापस भेजने का शुल्क
              </p>

              <div className="space-y-5">
                <div>
                  <p>
                    You will be responsible for paying your own shipping
                    costs when returning items.
                  </p>

                  <p className="mt-1">
                    उत्पाद वापस भेजने पर शिपिंग का खर्च आपको स्वयं वहन
                    करना होगा।
                  </p>
                </div>

                <div>
                  <p>Shipping costs are non-refundable.</p>

                  <p className="mt-1">
                    शिपिंग शुल्क वापस नहीं किया जाएगा।
                  </p>
                </div>

                <div>
                  <p>
                    In certain exceptional cases, if the shipping cost was
                    paid by a direct-selling entity, franchisee, or pickup
                    centre, the return shipping cost may be deducted from
                    the refund amount, subject to the applicable return
                    and refund policy.
                  </p>

                  <p className="mt-1">
                    कुछ विशेष परिस्थितियों में, यदि शिपिंग शुल्क
                    डायरेक्ट-सेलिंग संस्था, फ्रेंचाइज़ी या पिकअप सेंटर
                    द्वारा दिया गया हो, तो लागू रिटर्न एवं रिफंड नीति
                    के अनुसार वापसी शिपिंग का खर्च रिफंड राशि से काटा
                    जा सकता है।
                  </p>
                </div>
              </div>
            </section>

            {/* POLICY NOTICE */}
            <div
              className="
                mt-8
                border-t border-slate-200
                pt-5
                text-xs leading-6
                text-slate-500
              "
            >
              <p>
                Shipping fees, dispatch schedules, and delivery estimates
                should be confirmed by the website operator before
                publication.
              </p>

              <p className="mt-2">
                वेबसाइट पर प्रकाशित करने से पहले शिपिंग शुल्क, ऑर्डर भेजने
                के समय और डिलीवरी के अनुमान की पुष्टि वेबसाइट संचालक द्वारा
                की जानी चाहिए।
              </p>
            </div>
          </article>
        </div>

          
        </div>
      </div>
    
  );
}