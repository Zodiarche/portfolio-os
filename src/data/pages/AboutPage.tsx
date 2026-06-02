import { Avatar, Box, Divider, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { getAge } from "../../utils/getAge";

export default function AboutPage() {
  const theme = useTheme();
  const age = useMemo(getAge, []);
  return (
    <Box sx={{ maxWidth: 640, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mb: 3,
        }}
      >
        <Avatar
          src="/photo.jpg"
          alt="Benjamin Guillemin"
          sx={{ width: 96, height: 96, border: `3px solid ${theme.palette.primary.main}` }}
        />
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Benjamin Guillemin
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Concepteur Développeur
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bordeaux, France &nbsp;·&nbsp; {age} ans
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body1" paragraph sx={{ fontSize: "1.05rem" }}>
        Ce qui m'a amené au développement, c'est l'envie de créer des jeux vidéo. Le chemin m'a mené
        plus loin, vers les applications mobiles, les sites web, les logiciels, mais l'élan de
        départ est resté le même : construire des choses qui fonctionnent et qui servent à
        quelqu'un.
      </Typography>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
        Mon parcours
      </Typography>
      <Typography variant="body1" paragraph>
        Après une licence informatique à l'Université de Bordeaux, j'ai intégré la 3W Academy en
        alternance chez Agence Buzz. L'agence fonctionnait encore en PHP, FTP et Filezilla. J'y ai
        introduit le développement mobile avec Expo et React Native, mis en place Node.js et React,
        et dockerisé l'environnement local. En deux ans et demi, j'ai contribué à moderniser leurs
        process de développement.
      </Typography>
      <Typography variant="body1" paragraph>
        En parallèle, c'est au sein de Pokémon Workshop que j'ai le plus grandi en tant que
        développeur. J'ai commencé par de petites contributions, avant de devenir la personne la
        plus active du projet en dehors du staff, modérateur de la communauté, et reviewer de la
        majorité des merge requests. Apprendre à structurer du code, à travailler avec une dizaine
        de contributeurs, et à accompagner des utilisateurs. C'est cette expérience qui a façonné ma
        manière de travailler.
      </Typography>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
        Ce qui me motive
      </Typography>
      <Typography variant="body1" paragraph>
        Ce qui me plaît dans le code, c'est l'aspect créatif : partir d'un besoin et lui donner
        forme. J'aime quand les projets ne se ressemblent pas. Un e-commerce artisanal, une
        plateforme esport, un moteur de jeu... chaque sujet pousse à apprendre quelque chose de
        nouveau.
      </Typography>
      <Typography variant="body1" paragraph>
        Ce qui m'importe, au-delà du langage ou du framework, c'est la manière de penser le code :
        évolutif, maintenable, et pensé pour ceux qui passeront après moi. Écrire du code que les
        autres peuvent reprendre facilement, c'est aussi une forme de respect pour l'équipe.
      </Typography>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
        En dehors du code
      </Typography>
      <Typography variant="body1" paragraph>
        Je développe mon propre jeu vidéo. La conception, le game design, le rendu, tout
        m'intéresse. C'est un projet personnel qui me permet d'explorer des domaines que je ne
        touche pas au quotidien.
      </Typography>
      <Typography variant="body1" paragraph>
        En dehors de ça, le voyage et l'histoire des lieux que je visite me passionnent. Et le sport
        m'accompagne au quotidien, collectif ou individuel. C'est le meilleur moyen de décompresser
        après une journée de code.
      </Typography>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
        Ce que je cherche
      </Typography>
      <Typography variant="body1" paragraph>
        Continuer à apprendre, mais aussi transmettre. Ce qui me plaît, c'est autant de monter en
        compétences que d'accompagner : relecture de code, conseil, challenger des idées et en
        proposer. C'est ce que je fais déjà au quotidien dans l'open source.
      </Typography>
      <Typography variant="body1" paragraph>
        Que ce soit en CDI au sein d'une équipe ou en freelance sur des projets variés, je cherche
        des contextes où l'exigence technique va de pair avec le partage. Le genre d'environnement
        où on apprend les uns des autres.
      </Typography>
    </Box>
  );
}
