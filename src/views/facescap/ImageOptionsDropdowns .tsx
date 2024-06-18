// components/ImageOptionsDropdowns.js

const ImageOptionsDropdowns = ({ qualityOptions, ratioOptions, selectedQuality, selectedRatio, onQualityChange, onRatioChange }) => {
    return (
        <div>
            <label htmlFor="quality">Select Quality:</label>
            <select id="quality" value={selectedQuality} onChange={onQualityChange}>
                {qualityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <label htmlFor="ratio">Select Ratio:</label>
            <select id="ratio" value={selectedRatio} onChange={onRatioChange}>
                {ratioOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default ImageOptionsDropdowns;
