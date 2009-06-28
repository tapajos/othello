Jogo Othelo em javascript

O jogo é sempre iniciado pelo humano e dois modos de jogabilidades podem ser definidos. O modo fácil o CPU não utiliza heurística nas suas jogadas. Joga randomicamente. No modo normal, uma heurística fraca é utilizada. No modo difícil utiliza heurística com Minimax com corte alpha-beta. A melhor jogada é a escolhida.


Algumas coisas que ainda faltam implementar:

#001:
Melhorar o modo completo, pois a heurística não está funcionando 100% e por isso não está incluída nessa versão.

#002:
Fazê-lo funcionar no IE6. No momento funciona perfeitamente com Firefox e Safari.

#003:
Passar a vez quando não não existe jogada. Existe um pequeno bug que pode ocorrer quando a CPU ficar sem jogada possível.



Itens corrigidos:
- Um mesmo jogador não pode jogar duas vezes seguidas. Anteriormente o jogador humano podia clicar rapidamente em duas possíveis jogadas, atropelando a jogada do computador. Caso ainda sobrassem jogadas possíveis para o computador, ele jogava duas vezes seguidas também. Caso não sobrassem jogadas possíveis, o jogador ganhava o jogo e o computador entrava no bug #003