import { properties } from "@/data/propertiesData";
import { notFound } from "next/navigation";
import PropertyContent from "@/components/otherPages/propertyRoutContent";

export default async function PropertyPage(props: any) {
  // ✅ Await props.params because it's a Promise
  const { id } = await props.params;

  const property = properties.find((p) => p.id === parseInt(id, 10));

  if (!property) {
    notFound();
  }

  return <PropertyContent property={property} properties={properties} />;
}
