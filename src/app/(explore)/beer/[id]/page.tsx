import { prisma } from "@/lib/prisma";
import styles from "../../explore.module.scss";
import Image from "next/image";

const BeerPage = async ({ params }: { params: { id: string } }) => {
  const beer = async () => {
    const b = await prisma.beer.findUnique({
      where: { id: params.id },
    });

    return { ...b };
  };

  return (
    <div className={styles.beerContainer}>
      <div className={styles.imageColumn}>
        <Image
          className={styles.beerImage}
          src={(await beer()).image_url || ""}
          alt={(await beer()).name || ""}
          width={200}
          height={400}
        />
      </div>
      <div className={styles.textColumn}>
        <div className={styles.beerDescription}>
          <h1>
            {(await beer()).type} - {(await beer()).name}
          </h1>
          <h2 style={{ display: "inline" }}>
            <p style={{ display: "inline", fontSize: 28, fontWeight: 700 }}>
              Brewery:{" "}
            </p>
            <p style={{ display: "inline", fontSize: 28 }}>
              {" "}
              {(await beer()).breweryName}{" "}
            </p>
          </h2>
          <p>{(await beer()).description}</p>
          <h4>
            Alcohol:
            <p style={{ display: "inline" }}>
              {" "}
              {((await beer()).vol as unknown as number) || "Not Applicable"} %
            </p>
          </h4>
          <h4>
            Size:
            <p style={{ display: "inline" }}>
              {" "}
              {((await beer()).size as unknown as number) ||
                "Not Applicable"}{" "}
              mL
            </p>
          </h4>
          {(await beer()).ibu !== null && (
            <h4>
              IBU (International Bitterness Units):
              <p style={{ display: "inline" }}>
                {(await beer()).ibu as unknown as number}
              </p>
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeerPage;
