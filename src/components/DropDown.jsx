const Dropdown = ({ groups, selected, onChange }) => {
    return (
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            style={{
                padding: "8px 16px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                color: "#000",
            }}
        >
            <option value="All">All</option>
            {groups.map((group, i) => (
                <option key={i} value={group}>
                    {group}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
