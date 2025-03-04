import s from './Levels.module.css';

const Levels = ({ levels, lvl }) => {
    return (
        <div className={s.levelsList}>
            {levels.map((level, index) => (
                <li key={index} style={{ backgroundColor: level === lvl ? "var(--accent-color)" : "transparent", border: level === lvl ? "var(--accent-color)" : "rgba(18, 20, 23, 0.2)" }}>#{level}</li>
            ))}
        </div>
    );
};

export default Levels;