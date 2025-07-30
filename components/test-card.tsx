"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { MedicalTestEntry } from "@/types/contentful";
import ButtonComponent from "./Button";
import Image from "next/image";

interface TestCardProps {
  test: MedicalTestEntry;
  hideCart?: boolean;
  isScan?: boolean;
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="flex items-start gap-2 mb-2">
        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 bg-[#FFF8F0] rounded-full p-1" />
        <span className="text-sm text-body-text-gray">{children}</span>
      </li>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="space-y-2">{children}</ul>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-sm text-body-text-gray mb-2">{children}</p>
    ),
  },
};

const countTestsInRichText = (richText: any): number => {
  let count = 0;

  const countInNode = (node: any) => {
    if (node.nodeType === "list-item") {
      count++;
    }
    if (node.content) {
      node.content.forEach(countInNode);
    }
  };

  if (richText?.content) {
    richText.content.forEach(countInNode);
  }

  return count;
};

export function TestCard({ test, hideCart, isScan = false }: TestCardProps) {
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(test.sys.id);
  const inCart = isInCart(test.sys.id);

  const testCount = countTestsInRichText(test.fields.testList);
  const scanCount =
    test.fields.scan && typeof test.fields.scan === "object"
      ? countTestsInRichText(test.fields.scan)
      : 0;

  const finalCount = isScan && scanCount > 0 ? scanCount : testCount;

  const handleAddToCart = () => {
    addToCart({
      id: test.sys.id,
      testName: test.fields.testName,
      price: test.fields.price,
      category: test.fields.category,
      type: test.fields.type,
      testCount: finalCount > 0 ? finalCount : 1,
      isScan: isScan,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(test.sys.id, newQuantity);
  };

  return (
    <Card className="h-full flex flex-col bg-[--surface-card] border-none rounded-2xl md:rounded-3xl hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            {isScan && (
              <Image
                src={`https:${(test as any).fields?.image?.fields?.file.url}`}
                alt={(test as any).fields.image.fields.title}
                className="w-20 h-20 object-contain mb-2"
                width={20}
                height={20}
              />
            )}
            <h3 className="font-semibold text-md mb-1 max-w-[15rem]">
              {test?.fields?.testName}
            </h3>
            <p className="text-xl font-bold">
              &#8358;
              {test?.fields?.price}
            </p>
            {test.fields.description && (
              <p className=" text-body-text-gray mt-2 text-xs md:text-sm">
                {test.fields.description}
              </p>
            )}
          </div>
          {test?.fields?.category && (
            <span className="bg-[#FFF8F0] text-general-black px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap inline-flex">
              {test?.fields?.category}
            </span>
          )}
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-body-text-gray">
            {isScan
              ? `${scanCount > 0 ? scanCount : 1} Scan${
                  scanCount !== 1 ? "" : ""
                }`
              : `${testCount > 0 ? testCount : 1} Test${
                  testCount !== 1 ? "s" : ""
                }`}
          </span>
        </div>

        <div className="mb-3 flex-grow space-y-4">
          {test?.fields?.testList &&
            documentToReactComponents(test.fields.testList, richTextOptions)}
        </div>

        {!hideCart && (
          <div className="mt-auto">
            {!inCart ? (
              <ButtonComponent
                text="Add to Cart"
                defaultColor="#f2e9dd"
                hoverColor="#0D0D0DFC"
                icon={<Plus size={16} />}
                className="text-general-black hover:text-general-white "
                fullWidth
                onClick={handleAddToCart}
                arrow={false}
                linkTo=""
              />
            ) : (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="rounded-full bg-[#0D0D0DFC] text-white hover:bg-[#D9D0C6]"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button className="font-semibold text-lg flex-1 bg-[#D9D0C6] text-general-black rounded-full hover:bg-[#D9D0C6]">
                  {quantity}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="rounded-full bg-[#0D0D0DFC] text-white hover:bg-[#D9D0C6]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
