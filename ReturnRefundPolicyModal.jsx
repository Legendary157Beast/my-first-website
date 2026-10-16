
import React, { useEffect } from "react";
import { X, RotateCcw } from "lucide-react";

export default function RefundReturnPolicyModal({ onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="refund-return-policy-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <RotateCcw size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="refund-return-policy-title"
                className="truncate text-lg font-semibold text-slate-900 sm:text-xl"
              >
                Refund & Return Policy
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                रिफंड एवं रिटर्न नीति
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Refund & Return Policy / रिफंड एवं रिटर्न नीति बंद करें"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 py-5 text-sm leading-7 text-slate-700 sm:px-7 sm:py-6">
          <div className="mb-6 rounded-xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-900">
              Please review this Refund & Return Policy before making a
              purchase.
            </p>
            <p className="mt-1 text-emerald-800">
              खरीदारी करने से पहले कृपया इस रिफंड एवं रिटर्न नीति को
              ध्यानपूर्वक पढ़ें।
            </p>
          </div>

          <p className="mb-6">
            This policy describes the general process and conditions for
            returning products, requesting exchanges, and seeking refunds.
            Actual eligibility and procedures must follow the published
            policies of the website operator and applicable law.
          </p>

          <p className="mb-6">
            यह नीति उत्पाद वापस करने, एक्सचेंज का अनुरोध करने और रिफंड
            प्राप्त करने की सामान्य प्रक्रिया एवं शर्तों का वर्णन करती है।
            वास्तविक पात्रता और प्रक्रिया वेबसाइट संचालक की प्रकाशित नीतियों
            तथा लागू कानून के अनुसार होनी चाहिए।
          </p>

          <section className="space-y-7">
            {/* Product Return Policy */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                1. Product Return Policy
              </h3>

              <p className="mb-3 text-emerald-700">
                उत्पाद वापसी नीति
              </p>

              <p className="mb-3">
                If a product is in marketable condition and is returned
                within 30 days of receipt, together with the original
                invoice, a refund of 100% of the invoiced amount may be
                provided, subject to the applicable policy and law.
              </p>

              <p className="mb-3">
                यदि उत्पाद बिक्री योग्य स्थिति में है और उसे प्राप्त होने
                के 30 दिनों के भीतर मूल बिल के साथ वापस किया जाता है, तो
                लागू नीति एवं कानून के अधीन बिल की राशि का 100% रिफंड
                दिया जा सकता है।
              </p>

              <p className="mb-3">
                If a product is in unmarketable condition and is returned
                within 30 days of receipt, the refund value may be assessed
                by the designated grievance redressal officer.
              </p>

              <p className="mb-3">
                यदि उत्पाद बिक्री योग्य स्थिति में नहीं है और उसे प्राप्त
                होने के 30 दिनों के भीतर वापस किया जाता है, तो रिफंड की
                राशि का मूल्यांकन नामित शिकायत निवारण अधिकारी द्वारा
                किया जा सकता है।
              </p>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p>
                  <strong>Marketable condition:</strong> Products that are
                  unopened, sealed, and undamaged.
                </p>
                <p className="mt-1">
                  <strong>बिक्री योग्य स्थिति:</strong> ऐसे उत्पाद जो
                  खोले नहीं गए हों, जिनकी सील सुरक्षित हो और जिन्हें
                  किसी प्रकार का नुकसान न पहुँचा हो।
                </p>

                <p className="mt-4">
                  <strong>Unmarketable condition:</strong> Products that
                  have been opened or whose seal has been broken.
                </p>
                <p className="mt-1">
                  <strong>बिक्री योग्य न होने की स्थिति:</strong> ऐसे
                  उत्पाद जो खोले जा चुके हों या जिनकी सील टूट चुकी हो।
                </p>
              </div>
            </div>

            {/* Buyback / Refund */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                2. Buyback / Exchange / Refund Policy
              </h3>

              <p className="mb-3 text-emerald-700">
                बायबैक / एक्सचेंज / रिफंड नीति
              </p>

              <p className="mb-3">
                If you are not satisfied with a product, you may request
                its return within 30 days of receipt, provided that you
                notify the website operator of your intention within one
                week of receiving it. The request remains subject to the
                applicable return policy.
              </p>

              <p className="mb-3">
                यदि आप किसी उत्पाद से संतुष्ट नहीं हैं, तो उसे प्राप्त
                होने के 30 दिनों के भीतर वापसी का अनुरोध कर सकते हैं।
                इसके लिए उत्पाद प्राप्त होने के एक सप्ताह के भीतर
                वेबसाइट संचालक को सूचित करना होगा। अनुरोध लागू रिटर्न
                नीति के अधीन रहेगा।
              </p>

              <p className="mb-3">
                To initiate a return, exchange, or refund request, contact
                the official customer support channel listed on the
                website.
              </p>

              <p className="mb-3">
                रिटर्न, एक्सचेंज या रिफंड का अनुरोध शुरू करने के लिए
                वेबसाइट पर दिए गए आधिकारिक ग्राहक सहायता माध्यम से
                संपर्क करें।
              </p>

              <p className="mb-3">
                The policy may cover products in saleable condition and
                partially used products whose usage does not exceed 30%
                of the total volume, provided the required invoice and
                other conditions are satisfied. Products intentionally
                damaged or misused may be excluded, subject to applicable
                law.
              </p>

              <p>
                नीति में बिक्री योग्य उत्पाद तथा आंशिक रूप से उपयोग किए
                गए ऐसे उत्पाद शामिल हो सकते हैं जिनका उपयोग कुल मात्रा
                के 30% से अधिक न हो, बशर्ते आवश्यक बिल और अन्य शर्तें
                पूरी हों। जानबूझकर क्षतिग्रस्त किए गए या गलत तरीके से
                उपयोग किए गए उत्पाद लागू कानून के अधीन अपात्र हो सकते हैं।
              </p>
            </div>

            {/* Refund Conditions */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                3. Refund Conditions
              </h3>

              <p className="mb-3 text-emerald-700">
                रिफंड की शर्तें
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-900">
                        Condition / स्थिति
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-900">
                        Time Period / समय सीमा
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-900">
                        Refund / रिफंड
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">
                        Saleable / Marketable
                        <p className="text-slate-500">बिक्री योग्य</p>
                      </td>
                      <td className="px-4 py-3">
                        Within 30 days
                        <p className="text-slate-500">30 दिनों के भीतर</p>
                      </td>
                      <td className="px-4 py-3">
                        Invoiced value, subject to eligibility
                        <p className="text-slate-500">
                          पात्रता के अधीन बिल की राशि
                        </p>
                      </td>
                    </tr>

                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">
                        Un-saleable / Unmarketable
                        <p className="text-slate-500">
                          बिक्री योग्य नहीं
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        Within 30 days
                        <p className="text-slate-500">30 दिनों के भीतर</p>
                      </td>
                      <td className="px-4 py-3">
                        Value assessed by the designated grievance
                        redressal officer
                        <p className="text-slate-500">
                          नामित शिकायत निवारण अधिकारी द्वारा मूल्यांकन
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Exchange */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                4. Exchange
              </h3>

              <p className="mb-3 text-emerald-700">
                उत्पाद एक्सचेंज
              </p>

              <p className="mb-3">
                An unopened, unsealed, undamaged, or unused product may
                be eligible for exchange within 30 days of receipt,
                subject to the applicable requirements and original invoice.
              </p>

              <p className="mb-3">
                लागू शर्तों और मूल बिल के अधीन, बिना खोला गया, बिना सील
                वाला, बिना क्षति पहुँचा या अप्रयुक्त उत्पाद प्राप्त होने
                के 30 दिनों के भीतर एक्सचेंज के लिए पात्र हो सकता है।
              </p>

              <p className="mb-3 font-medium text-slate-900">
                The following may be required for an exchange:
              </p>

              <p className="mb-3 font-medium text-slate-900">
                एक्सचेंज के लिए निम्नलिखित की आवश्यकता हो सकती है:
              </p>

              <ul className="list-disc space-y-3 pl-5">
                <li>
                  A completed product return form.
                  <p>भरा हुआ उत्पाद वापसी फॉर्म।</p>
                </li>

                <li>
                  A copy of the purchase invoice or proof of receipt.
                  <p>खरीद बिल या उत्पाद प्राप्ति के प्रमाण की प्रति।</p>
                </li>

                <li>
                  The product in its original packaging and marketable
                  condition.
                  <p>उत्पाद अपनी मूल पैकिंग और बिक्री योग्य स्थिति में।</p>
                </li>

                <li>
                  Exchange for a product of equal or higher price, with
                  payment of any price difference where applicable.
                  <p>
                    समान या अधिक कीमत वाले उत्पाद से एक्सचेंज; जहाँ लागू
                    हो, वहाँ कीमत का अंतर चुकाना होगा।
                  </p>
                </li>
              </ul>

              <p className="mt-4">
                The customer may be responsible for shipping the product
                to the return location designated by the website operator.
              </p>

              <p className="mt-2">
                ग्राहक वेबसाइट संचालक द्वारा निर्धारित वापसी स्थान तक
                उत्पाद भेजने के शिपिंग खर्च के लिए जिम्मेदार हो सकता है।
              </p>
            </div>

            {/* Refund Process */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                5. Refund Process
              </h3>

              <p className="mb-3 text-emerald-700">
                रिफंड की प्रक्रिया
              </p>

              <p className="mb-3">
                After receiving the returned product, the website operator
                may inspect it and notify the customer that it has been
                received.
              </p>

              <p className="mb-3">
                वापस किया गया उत्पाद प्राप्त होने के बाद, वेबसाइट
                संचालक उसकी जाँच कर सकता है और ग्राहक को प्राप्ति की
                सूचना दे सकता है।
              </p>

              <p className="mb-3">
                The customer will be notified of the refund decision after
                the inspection and eligibility review.
              </p>

              <p className="mb-3">
                जाँच और पात्रता की समीक्षा के बाद ग्राहक को रिफंड संबंधी
                निर्णय की सूचना दी जाएगी।
              </p>

              <p className="mb-3">
                If the return is accepted, the refund amount will be
                calculated according to the applicable refund policy.
              </p>

              <p className="mb-3">
                वापसी स्वीकार होने पर रिफंड की राशि लागू रिफंड नीति के
                अनुसार निर्धारित की जाएगी।
              </p>

              <p>
                An approved refund may be sent to the eligible bank
                account or original payment method, subject to the
                applicable payment process and law.
              </p>

              <p className="mt-2">
                स्वीकृत रिफंड लागू भुगतान प्रक्रिया और कानून के अधीन,
                पात्र बैंक खाते या मूल भुगतान माध्यम में भेजा जा सकता है।
              </p>

              <p className="mt-4 font-medium text-slate-900">
                Refunds will not be made in cash unless required by
                applicable law.
              </p>

              <p className="mt-1 font-medium text-slate-900">
                लागू कानून द्वारा आवश्यक न होने पर रिफंड नकद में नहीं
                दिया जाएगा।
              </p>
            </div>

            {/* Return Shipping Cost */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                6. Return Shipping Cost
              </h3>

              <p className="mb-3 text-emerald-700">
                वापसी शिपिंग का खर्च
              </p>

              <p className="mb-3">
                Customers may be responsible for paying the shipping
                cost of returning products, according to the applicable
                return policy.
              </p>

              <p className="mb-3">
                लागू रिटर्न नीति के अनुसार, उत्पाद वापस भेजने का शिपिंग
                खर्च ग्राहक को वहन करना पड़ सकता है।
              </p>

              <p>
                Shipping costs are generally non-refundable. Where the
                website operator or another designated party paid the
                original shipping cost, the return shipping cost may be
                deducted from the refund where the published policy and
                applicable law permit.
              </p>

              <p className="mt-2">
                सामान्यतः शिपिंग शुल्क वापस नहीं किया जाता। यदि मूल
                शिपिंग खर्च वेबसाइट संचालक या किसी अन्य निर्धारित पक्ष
                ने दिया हो, तो प्रकाशित नीति और लागू कानून की अनुमति
                के अनुसार वापसी शिपिंग का खर्च रिफंड से काटा जा सकता है।
              </p>
            </div>

            {/* Cancellation */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                7. Cancellation of Orders
              </h3>

              <p className="mb-3 text-emerald-700">
                ऑर्डर रद्द करना
              </p>

              <h4 className="mb-2 font-semibold text-slate-800">
                Cancellation by the Website Operator
              </h4>

              <p className="mb-3 text-emerald-700">
                वेबसाइट संचालक द्वारा ऑर्डर रद्द करना
              </p>

              <p className="mb-4">
                An order may be refused or cancelled due to product or
                quantity unavailability, verification requirements, or
                other valid reasons permitted by applicable law.
              </p>

              <p className="mb-4">
                उत्पाद या मात्रा उपलब्ध न होने, सत्यापन की आवश्यकता या
                लागू कानून द्वारा अनुमत अन्य उचित कारणों से ऑर्डर
                अस्वीकार या रद्द किया जा सकता है।
              </p>

              <p className="mb-4">
                If payment has already been processed for a cancelled
                order, the eligible amount will be refunded or reversed
                through the applicable payment method, subject to the
                relevant policy and law.
              </p>

              <p className="mb-4">
                रद्द किए गए ऑर्डर का भुगतान पहले ही हो चुका हो, तो
                संबंधित नीति और कानून के अधीन पात्र राशि लागू भुगतान
                माध्यम से वापस या रिवर्स की जाएगी।
              </p>

              <h4 className="mb-2 font-semibold text-slate-800">
                Cancellation by the Customer
              </h4>

              <p className="mb-3 text-emerald-700">
                ग्राहक द्वारा ऑर्डर रद्द करना
              </p>

              <p>
                If a cancellation request is received before an order
                has been processed, the website operator may cancel
                the order and refund any eligible payment within a
                reasonable period.
              </p>

              <p className="mt-2">
                यदि ऑर्डर की प्रक्रिया शुरू होने से पहले रद्द करने का
                अनुरोध प्राप्त होता है, तो वेबसाइट संचालक ऑर्डर रद्द
                करके पात्र भुगतान उचित समय के भीतर वापस कर सकता है।
              </p>

              <p className="mt-3">
                Orders that have already been processed or dispatched
                may not be eligible for cancellation. In such cases,
                customers may request a return under the applicable
                return policy.
              </p>

              <p className="mt-2">
                जिन ऑर्डरों की प्रक्रिया पूरी हो चुकी है या जिन्हें भेज
                दिया गया है, वे रद्द करने के पात्र नहीं भी हो सकते।
                ऐसी स्थिति में ग्राहक लागू रिटर्न नीति के अनुसार वापसी
                का अनुरोध कर सकता है।
              </p>
            </div>

            {/* Return Requirements */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                8. Return Requirements & Additional Information
              </h3>

              <p className="mb-3 text-emerald-700">
                वापसी की आवश्यकताएँ एवं अतिरिक्त जानकारी
              </p>

              <ul className="list-disc space-y-4 pl-5">
                <li>
                  Products must be returned to the address or collection
                  location specified by the website operator.
                  <p>
                    उत्पाद वेबसाइट संचालक द्वारा बताए गए पते या संग्रह
                    स्थान पर वापस भेजे जाने चाहिए।
                  </p>
                </li>

                <li>
                  A product return form may need to be completed and
                  included with the returned product.
                  <p>
                    उत्पाद वापसी फॉर्म भरकर वापस किए जाने वाले उत्पाद
                    के साथ भेजना आवश्यक हो सकता है।
                  </p>
                </li>

                <li>
                  The return period may be calculated from the date the
                  customer receives the product to the date it reaches
                  the designated return location, according to the
                  published policy.
                  <p>
                    प्रकाशित नीति के अनुसार, वापसी की समय-सीमा की गणना
                    ग्राहक द्वारा उत्पाद प्राप्त करने की तारीख से लेकर
                    निर्धारित वापसी स्थान पर उत्पाद पहुँचने की तारीख
                    तक की जा सकती है।
                  </p>
                </li>

                <li>
                  The condition of returned products may be assessed by
                  the designated returns or grievance team.
                  <p>
                    वापस किए गए उत्पादों की स्थिति का मूल्यांकन नामित
                    रिटर्न या शिकायत निवारण टीम द्वारा किया जा सकता है।
                  </p>
                </li>

                <li>
                  Non-resalable literature, videos, or other sales and
                  marketing materials may be excluded from returns,
                  where the applicable policy permits.
                  <p>
                    लागू नीति की अनुमति होने पर, पुनः बिक्री के लिए
                    न बनाई गई साहित्य सामग्री, वीडियो या अन्य बिक्री
                    एवं मार्केटिंग सामग्री वापसी से बाहर रखी जा सकती है।
                  </p>
                </li>

                <li>
                  Additional conditions may apply depending on the
                  product category and applicable law.
                  <p>
                    उत्पाद की श्रेणी और लागू कानून के आधार पर अतिरिक्त
                    शर्तें लागू हो सकती हैं।
                  </p>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="rounded-xl bg-emerald-50 p-4 sm:p-5">
              <h3 className="mb-2 text-base font-semibold text-emerald-900">
                Need Help With a Return or Refund?
              </h3>

              <p className="mb-3 font-medium text-emerald-800">
                रिटर्न या रिफंड में सहायता चाहिए?
              </p>

              <p className="text-emerald-900/80">
                Contact the official customer support team using the
                contact details published on this website.
              </p>

              <p className="mt-2 text-emerald-900/80">
                इस वेबसाइट पर प्रकाशित संपर्क विवरण का उपयोग करके
                आधिकारिक ग्राहक सहायता टीम से संपर्क करें।
              </p>
            </div>
          </section>

         
    
        </div>
      </div>
    </div>
  );
}
