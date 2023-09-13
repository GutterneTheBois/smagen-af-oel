import { FC } from "react";
import Image from "next/image";
import styles from "./footer.module.scss";
import { BsFacebook } from "react-icons/bs";

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.item__menu__container}>
				<div className={styles.item__menu__list}>
					<a className={styles.logo} href="/">
						<Image
							className={styles.img}
							width={83}
							height={68}
							src={"/logo.jpg"}
							alt={"logo"}
						/>
					</a>
					<div className={styles.item__menu}>
						<ul className={styles.item__menu__items}>
							<li className={styles.item__header}>Kontakt</li>
							<li className={styles.item}>
								<p>Hærvejen 73, 6230 Rødekro</p>
								<p>Mobil: 5049 9012</p>
								<p>smagenafoel@gmail.com</p>
								<p>CVR.nr.: 38 72 08 48</p>
							</li>
						</ul>
					</div>
					<div className={styles.item__menu}>
						<ul className={styles.item__menu__items}>
							<li className={styles.item__header}>
								Smagen af Øl
							</li>
							<li className={styles.item}>
								<p>
									<b>Heinrich Loff,</b>
									<br /> Beer Sommelier
								</p>
								<a
									className={styles.link}
									href="https://www.facebook.com/Smagen-af-Øl-1685648551709238/"
									target="_blank"
								>
									<div style={{ display: "flex" }}>
										<BsFacebook
											className={styles.fb__logo}
										/>
										<p className={styles.fb__text}>
											Facebook
										</p>
									</div>
								</a>
							</li>
						</ul>
					</div>
					<div className={styles.item__menu}>
						<ul className={styles.item__menu__items}>
							<li className={styles.item__header}>
								Åbningstider
							</li>
							<li className={styles.item}>
								<p>Mandag-Fredag: 15.30-17.30</p>
								<p>Onsdag: LUKKET</p>
								<p>Lørdag: 10.00-13.00</p>
								<p>Søndag: LUKKET</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
