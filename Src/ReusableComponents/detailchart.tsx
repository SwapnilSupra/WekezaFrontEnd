import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";


interface chartProp {

    symbol: any,
    closeprice: any,
    time: any
    clock_flag: any,
}

let label: any = [];
let value: any = [];

const DetailChart = (props: chartProp) => {

    const ref = React.useRef();
    const [pos, setPos] = React.useState(0);
    const [scrollPosition, setScrollPosition] = React.useState(0)

    const chartConfig = {

        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.1,
        useShadowColorFromDataset: true, // optional
    }

    const PlotData = () => {

        var data = {
            labels: label,
            datasets: [
                {
                    data: value,
                    color: (opacity = 1) => `rgba(0, 98, 38, ${opacity})`, // optional
                    strokeWidth: 2 //optional
                }
            ],
            legend: ["Close price"] //optional
        };

        return (
            <>
                <ScrollView horizontal={true}  >
                    {value.length > 0 ?
                        <LineChart
                            data={data}
                            width={label.length * 75}
                            height={256}
                            verticalLabelRotation={10}
                            chartConfig={chartConfig}
                            bezier
                        />
                        : null}
                </ScrollView>
            </>
        );
    };

    useEffect(() => {

        if (props.time != undefined || props.time != null) {

            var date = new Date(props.time);
            if (label == '0') { label.push(date.toISOString().split("T")[1].split(".")[0]); }
            else { label.push(date.toISOString().split("T")[1].split(".")[0]); }
            if (props.closeprice != undefined || props.closeprice != null) {
                if (value.length == 0) { value.push(props.closeprice); }
                else { value.push(props.closeprice); }
            }
            PlotData();
            // console.log(label);
            // console.log(value);
        }

    }, [props]);

    return (
        <>
            {
                props.closeprice != null ? (
                    <PlotData />
                ) : null
            }
        </>
    );
};

export default DetailChart;
