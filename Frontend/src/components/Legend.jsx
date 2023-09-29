
const Legend = () => {
    return (
        <div className="legend">
            <div style={{ "--color": '#000000' }}>Higher Priority Areas</div>
            <div style={{ "--color": '#f8f8f8' }}>Lower Priority Areas</div>
            <div>Blue Markers are for notable cities that have an extraordinarily large wind speed compared to population</div>
        </div>
    );
}
export default Legend;