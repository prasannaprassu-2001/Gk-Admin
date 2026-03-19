// RoleGrid.jsx
const RoleGrid = ({ roles }) => (
  <div className="grid grid-cols-3 gap-4">
    {roles.map((role) => (
      <div key={role.id} className="border p-4 rounded shadow">
        <h3 className="font-bold">{role.label}</h3>
        <p>Name: {role.name}</p>
        <p>Level: {role.level}</p>
      </div>
    ))}
  </div>
);

export default RoleGrid;