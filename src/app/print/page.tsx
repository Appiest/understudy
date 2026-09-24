import type { Metadata } from "next";
import { PrintDeck } from "@/components/deck/PrintDeck";
import { team } from "@/content/config";

export const metadata: Metadata = {
  title: `${team.productName} for print`,
};

export default function PrintPage() {
  return <PrintDeck />;
}
