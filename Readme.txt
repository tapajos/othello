Jogo Othelo em javascript

O jogo � sempre iniciado pelo humano e dois modos de jogabilidades podem ser definidos. O modo f�cil o CPU n�o utiliza heur�stica nas suas jogadas. Joga randomicamente. No modo normal, uma heur�stica fraca � utilizada. No modo dif�cil utiliza heur�stica com Minimax com corte alpha-beta. A melhor jogada � a escolhida.


Algumas coisas que ainda faltam implementar:

#001:
Melhorar o modo completo, pois a heur�stica n�o est� funcionando 100% e por isso n�o est� inclu�da nessa vers�o.

#002:
Faz�-lo funcionar no IE6. No momento funciona perfeitamente com Firefox e Safari.

#003:
Passar a vez quando n�o n�o existe jogada. Existe um pequeno bug que pode ocorrer quando a CPU ficar sem jogada poss�vel.



Itens corrigidos:
- Um mesmo jogador n�o pode jogar duas vezes seguidas. Anteriormente o jogador humano podia clicar rapidamente em duas poss�veis jogadas, atropelando a jogada do computador. Caso ainda sobrassem jogadas poss�veis para o computador, ele jogava duas vezes seguidas tamb�m. Caso n�o sobrassem jogadas poss�veis, o jogador ganhava o jogo e o computador entrava no bug #003