import {formatRedemptionDate} from "@/components/ui/(tabs)/transactions/transaction-card";
import {HandleScrollParams} from "@/app/(tabs)/types";
import {Voucher} from "@/lib/definitions";

export function handleScroll({
    event,
    nextUrl,
    setIsBottom,
    setCurrentPage,
}: HandleScrollParams) {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (contentHeight - contentOffsetY <= layoutHeight + 20) {
        setIsBottom(true);
        if (nextUrl !== null) {
            setCurrentPage((page) => page + 1);
        }
    } else {
        setIsBottom(false);
    }
}


export function groupVouchersByDate(vouchers: Voucher[]) {
    const grouped: { [key: string]: Voucher[] } = {};

    vouchers.forEach(voucher => {
        const rawDate = voucher.redemption!.redeemed_on;
        const groupTitle = formatRedemptionDate(rawDate);

        if (!grouped[groupTitle]) {
            grouped[groupTitle] = [];
        }
        grouped[groupTitle].push(voucher);
    });

    return Object.keys(grouped).map(date => ({
        title: date,
        data: grouped[date],
    }));
}