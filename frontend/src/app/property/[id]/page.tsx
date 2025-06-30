  
import { properties } from "@/data/propertiesData";
import { notFound } from "next/navigation";
import PropertyContent from "@/app/components/otherPages/propertyRoutContent";

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const property = properties.find((p) => p.id === parseInt(params.id));

  if (!property) return notFound();

  return <PropertyContent property={property} properties={properties} />;
}
