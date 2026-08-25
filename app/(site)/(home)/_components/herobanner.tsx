import { SanityImage } from "@/components/common/image"
import { HomePageQueryResult } from "@/sanity.types"
import { toPlainText } from "next-sanity"

const Herobanner = ({data}: {data: NonNullable<HomePageQueryResult>}) => {
    return <div className="max-width-container max-content-pannel relative">
        <SanityImage src={data.herobannerLeftImages[0]} alt={toPlainText(data.herobannerTitle)} width={1000} height={1000} />
    </div>
}

export default Herobanner