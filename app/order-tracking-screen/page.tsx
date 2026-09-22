"use client";

import { useState } from "react";
import {
  FaBoxOpen,
  FaCheck,
  FaCircleExclamation,
  FaClock,
  FaEnvelope,
  FaHeadset,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";
import { toast } from "sonner";

enum OrderStatus {
  Processing = "Processing",
  Shipped = "Shipped",
  OutForDelivery = "Out for Delivery",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

type OrderState =
  | "normal"
  | "delayed"
  | "deliveredNotReceived"
  | "trackingUnavailable";

const dummyOrderData = {
  id: "TRX12345",
  progress: 65,
  status: OrderStatus.OutForDelivery,
  estimatedDelivery: "Today, 2:30 PM",
  summary: "1x Widget A, 2x Widget B",
  supportContact: "support@example.com",
};

const handleContactSupport = () => {
  try {
    navigator.clipboard.writeText(dummyOrderData.supportContact).then(
      () => {
        toast.success("Support email copied to clipboard!");
      }
    );
  } catch {
    toast.error("Failed to copy email. Please try again.");
  }
};

function OrderTrackinScreenClientPage() {
  const [orderState, setOrderState] = useState<OrderState>("normal");

  const order = dummyOrderData;

  const isDelayed = orderState === "delayed";
  const isDeliveredNotReceived = orderState === "deliveredNotReceived";
  const isTrackingUnavailable = orderState === "trackingUnavailable";

  const currentStatus = isDeliveredNotReceived
    ? OrderStatus.Delivered
    : order.status;

  const statuses = Object.values(OrderStatus).filter(
    (status) => status !== OrderStatus.Cancelled
  );

  const currentIndex = isTrackingUnavailable
    ? -1
    : isDeliveredNotReceived
      ? statuses.length - 1
      : Object.values(OrderStatus).indexOf(currentStatus);

  const currentProgress = isTrackingUnavailable
    ? 0
    : isDeliveredNotReceived
      ? 100
      : isDelayed
        ? Math.min(order.progress, 65)
        : order.progress;

  return (
    <main className="min-h-screen w-full bg-white px-4 py-4 text-zinc-700 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col sm:min-h-[calc(100vh-3rem)]">
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
          <h1 className="text-2xl font-bold sm:text-3xl">My Orders</h1>

          <label className="flex items-center gap-2">
            <span className="sr-only">Select order state</span>

            <select
              aria-label="Select order state"
              value={orderState}
              onChange={(e) => setOrderState(e.target.value as OrderState)}
              className="max-w-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 sm:max-w-none"
            >
              <option value="normal">Normal</option>
              <option value="delayed">Delayed</option>
              <option value="deliveredNotReceived">
                Delivered but not received
              </option>
              <option value="trackingUnavailable">
                Tracking unavailable
              </option>
            </select>
          </label>
        </div>

        <section
          aria-label={`Order ${order.id}`}
          className="flex-1 rounded-2xl bg-neutral-100 p-4 sm:p-5 lg:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">Order</p>
              <h2 className="text-xl font-bold sm:text-2xl">
                #{order.id}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-sm text-zinc-500">Status</p>

              <p
                className={`text-base font-semibold sm:text-lg ${
                  isDelayed || isDeliveredNotReceived
                    ? "text-amber-600"
                    : isTrackingUnavailable
                      ? "text-zinc-500"
                      : "text-lime-600"
                }`}
              >
                {isDelayed
                  ? "Delayed"
                  : isDeliveredNotReceived
                    ? "Delivery issue"
                    : isTrackingUnavailable
                      ? "Tracking unavailable"
                      : currentStatus}
              </p>
            </div>
          </div>

          {(isDelayed ||
            isDeliveredNotReceived ||
            isTrackingUnavailable) && (
            <div
              role="alert"
              className={`mt-4 rounded-xl p-4 sm:p-5 ${
                isDelayed
                  ? "border border-amber-200 bg-amber-50"
                  : isDeliveredNotReceived
                    ? "border border-red-200 bg-red-50"
                    : "border border-neutral-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    isDelayed
                      ? "bg-amber-100 text-amber-700"
                      : isDeliveredNotReceived
                        ? "bg-red-100 text-red-700"
                        : "bg-neutral-100 text-zinc-500"
                  }`}
                >
                  {isDelayed ? (
                    <FaTriangleExclamation />
                  ) : isDeliveredNotReceived ? (
                    <FaCircleExclamation />
                  ) : (
                    <IoInformationCircle size={22} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    className={`text-base font-bold sm:text-lg ${
                      isDelayed
                        ? "text-amber-900"
                        : isDeliveredNotReceived
                          ? "text-red-900"
                          : "text-zinc-900"
                    }`}
                  >
                    {isDelayed
                      ? "Your order is delayed"
                      : isDeliveredNotReceived
                        ? "Package marked as delivered"
                        : "Tracking information isn't available yet"}
                  </h2>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      isDelayed
                        ? "text-amber-800"
                        : isDeliveredNotReceived
                          ? "text-red-800"
                          : "text-zinc-500"
                    }`}
                  >
                    {isDelayed
                      ? "Your package has not arrived within the expected delivery window. We are waiting for an updated delivery time."
                      : isDeliveredNotReceived
                        ? "The carrier says your package was delivered, but you have not received it. Check your delivery location first."
                        : "Your order is confirmed. Tracking details will appear once the carrier provides them."}
                  </p>

                  {isDelayed && (
                    <button
                      type="button"
                      aria-label="Contact support about delayed order"
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      <FaHeadset aria-hidden="true" />
                      Contact support
                    </button>
                  )}

                  {isDeliveredNotReceived && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        aria-label="Report missing package"
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <FaBoxOpen aria-hidden="true" />
                        Report missing package
                      </button>

                      <button
                        type="button"
                        aria-label="Contact support about missing package"
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                      >
                        <FaHeadset aria-hidden="true" />
                        Contact support
                      </button>
                    </div>
                  )}

                  {isTrackingUnavailable && (
                    <p className="mt-2 flex items-center gap-2 text-sm font-medium text-zinc-700">
                      <FaClock aria-hidden="true" />
                      Estimated delivery: {order.estimatedDelivery}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 rounded-xl bg-white p-4 sm:p-5 lg:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-500">Order Progress</p>

                <h3
                  aria-label={`Order progress ${currentProgress} percent`}
                  className="text-3xl font-bold sm:text-4xl"
                >
                  {currentProgress}%
                </h3>
              </div>

              <div className="text-right">
                <p className="text-xs text-zinc-500 sm:text-sm">
                  Estimated delivery
                </p>

                <p
                  className={`text-base font-semibold sm:text-lg ${
                    isDelayed ? "text-amber-600" : ""
                  }`}
                >
                  {isDelayed ? "Delivery delayed" : order.estimatedDelivery}
                </p>
              </div>
            </div>

            <div
              className="mt-4 h-2 w-full rounded-full bg-neutral-200"
              role="progressbar"
              aria-valuenow={currentProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Order delivery progress"
            >
              <div
                className={`h-2 rounded-full transition-all ${
                  isDelayed
                    ? "bg-amber-400"
                    : isTrackingUnavailable
                      ? "bg-neutral-300"
                      : "bg-lime-400"
                }`}
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-white p-4 sm:p-5 lg:p-6">
            <h2 className="mb-5 text-lg font-bold sm:text-xl">
              Delivery Status
            </h2>

            {isTrackingUnavailable ? (
              <div className="rounded-lg bg-neutral-100 p-4">
                <div className="flex items-center gap-3">
                  <IoInformationCircle
                    aria-hidden="true"
                    className="shrink-0 text-zinc-500"
                    size={22}
                  />

                  <div>
                    <p className="text-sm font-semibold sm:text-base">
                      Tracking hasn&apos;t started yet
                    </p>

                    <p className="mt-1 text-sm leading-5 text-zinc-500">
                      Tracking updates will appear here when available.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="relative flex w-full justify-between"
                aria-label="Delivery progress timeline"
              >
                {statuses.map((status, index) => {
                  const isCompleted = index < currentIndex;
                  const isCurrent = index === currentIndex;

                  return (
                    <div
                      key={status}
                      className="relative flex min-w-0 flex-1 flex-col items-center text-center"
                    >
                      {index < statuses.length - 1 && (
                        <div
                          aria-hidden="true"
                          className={`absolute left-1/2 top-3 h-0.5 w-full ${
                            index < currentIndex
                              ? "bg-lime-400"
                              : "bg-neutral-200"
                          }`}
                        />
                      )}

                      <div
                        aria-current={isCurrent ? "step" : undefined}
                        aria-label={`${status}${isCurrent ? ", current status" : isCompleted ? ", completed" : ""}`}
                        className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          isCompleted || isCurrent
                            ? "border-lime-400 bg-lime-400"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {(isCompleted || isCurrent) && (
                          <FaCheck
                            aria-hidden="true"
                            className="text-[10px] text-white"
                          />
                        )}
                      </div>

                      <p
                        className={`mt-2 text-xs leading-4 sm:text-sm ${
                          isCurrent
                            ? "font-semibold text-zinc-900"
                            : "text-zinc-500"
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <section
              aria-labelledby="order-details-heading"
              className="rounded-xl bg-white p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="order-details-heading"
                  className="text-lg font-bold sm:text-xl"
                >
                  Order Details
                </h2>

                <button
                  type="button"
                  aria-label="View order details"
                  className="text-sm font-semibold text-lime-600 transition hover:text-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
                >
                  View details
                </button>
              </div>

              <div className="mt-3 rounded-lg bg-neutral-100 p-4">
                <p className="text-sm text-zinc-500">Items</p>

                <p className="mt-1 text-sm font-medium sm:text-base">
                  {order.summary}
                </p>
              </div>
            </section>

            <section
              aria-labelledby="support-heading"
              className="rounded-xl bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-700"
                >
                  <FaHeadset size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    id="support-heading"
                    className="text-lg font-bold sm:text-xl"
                  >
                    Need help?
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-zinc-500">
                    Our support team can help with delivery problems or
                    missing packages.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleContactSupport}
                      aria-label="Contact customer support"
                      className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    >
                      <FaHeadset aria-hidden="true" />
                      Contact support
                      {/* Either redirect kore dibe ekta mail template e or give an alert that support email has been copied */}
                    </button>

                    <button
                      type="button"
                      onClick={handleContactSupport}
                      aria-label={`Email support at ${order.supportContact}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
                    >
                      <FaEnvelope aria-hidden="true" />
                      Email us
                    </button>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                    <FaEnvelope aria-hidden="true" />
                    {order.supportContact}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OrderTrackinScreenClientPage;